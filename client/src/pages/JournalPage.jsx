import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../constants/ROLES.js';

export default function JournalPage() {
  let navigate = useNavigate();
  if (!localStorage.getItem('USER')) navigate('/login');
  const [selectedClass, setSelectedClass] = useState(2);
  const [listOfStudentsWithGrades, setListOfStudentsWithGrades] = useState([]);
  const [studentsNames, setStudentsNames] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedName, setSelectedName] = useState('');
  const [list, setList] = useState();
  const [currentName, setCurrentName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [gradeValue, setGradeValue] = useState(5);
  const [dateValue, setDateValue] = useState(
    new Date().toISOString().split('T')[0]
  );
  let counter = 0;
  const [gradeId, setGradeId] = useState(0);
  const parsedStorage = JSON.parse(localStorage.getItem('USER'));
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date = new Date()) {
    date = new Date(date);
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }
  useEffect(() => {
    async function fetchStudents() {
      console.log(selectedClass);
      const response = await fetch(
        `http://localhost:3000/journal?class=${selectedClass}`
      );
      const parsed = await response.json();
      return parsed;
    }

    fetchStudents().then((e) => {
      const { students, listOfStudentsNames } = e;
      console.log(students);
      setStudentsNames(listOfStudentsNames);
      setListOfStudentsWithGrades(students);
      setSelectedName(listOfStudentsNames[0]);
    });
  }, [selectedClass, counter]);

  function formatList(selectedStudent) {
    const testObj = selectedStudent?.reduce((acc, curr) => {
      if (!(curr.subject in acc)) acc[curr.subject] = [];
      acc[curr.subject].push({
        value: curr.value,
        teacher: curr.teacher,
        date: new Date(curr.date).toLocaleDateString(),
        subject: curr.subject,
        id: curr.id,
      });
      return acc;
    }, {});
    if (testObj !== null && testObj !== undefined) {
      let a = Object.keys(testObj)?.map((item) => (
        <tr key={item}>
          <td>{item}</td>
          {testObj[item].map((val, i) => (
            <td
              key={item + i}
              className='tooltip'
              data-tooltip={`Учитель: ${val.teacher.name}. Дата: ${val.date}`}
              onClick={() => {
                setGradeId(val.id);
                setGradeValue(val.value);
                setDateValue(formatDate(new Date(val.date)));
                setSelectedSubject(val.subject);
              }}
            >
              {val.value}
            </td>
          ))}
        </tr>
      ));
      setList(a);
    }
  }

  const addGrade = async () => {
    try {
      const response = await fetch('http://localhost:3000/grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: gradeValue,
          date: dateValue,
          studentId: 13,
          teacherId: 13,
          subjectId: 1,
        }),
      });
      const data = await response.json();
      console.log(data);
      formatList(selectedStudent);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteGrade = async (gradeId) => {
    try {
      await fetch(`http://localhost:3000/grades/${gradeId}`, {
        method: 'DELETE',
      });
      formatList(selectedStudent);
    } catch (error) {
      console.error(error);
    }
  };
  const updateGrade = async (gradeId) => {
    try {
      const response = await fetch(`http://localhost:3000/grades/${gradeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: gradeValue,
          date: dateValue,
        }),
      });
      const data = await response.json();
      console.log(data);
      formatList(selectedStudent);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <div>
        <div className='filter_inputs'>
          <label htmlFor='classes'>Класс: </label>
          <select
            name='classes'
            id='classes'
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {Array.from(Array(11).keys()).map((_, i) => (
              <option value={i + 1} key={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <label htmlFor='list_of_names'>Ученик: </label>
          <select
            name='list_of_names'
            id='list_of_names'
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          >
            {studentsNames.map((student) => (
              <option key={student} value={student}>
                {student}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSelectedStudent(listOfStudentsWithGrades[selectedName]);
              setCurrentName(selectedName);
              formatList(listOfStudentsWithGrades[selectedName]);
            }}
          >
            Показать
          </button>
        </div>
        <div id='table_with_grades'>
          <h3>{currentName}</h3>
          <table border={1}>
            <thead>
              <tr>
                <th>Предмет</th>
                <th>Оценки</th>
              </tr>
            </thead>
            <tbody>{list?.map((i) => i)}</tbody>
          </table>
        </div>
      </div>
      {parsedStorage.role === ROLES.TEACHER && (
        <div>
          <div>
            <label htmlFor='subject'>Предмет</label>
            <input
              type='text'
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='date'>Дата</label>

            <input
              id='date'
              type='date'
              value={dateValue}
              onChange={(e) => {
                setDateValue(formatDate(new Date(e.target.value)));
              }}
            />
          </div>
          <div>
            <label htmlFor='grade'>Оценка</label>
            <input
              type='number'
              id='grade'
              min={1}
              max={10}
              value={gradeValue}
              onChange={(e) => setGradeValue(+e.target.value)}
            />
          </div>
          <button
            onClick={async () => {
              await addGrade();
            }}
          >
            Добавить
          </button>
          <button onClick={async () => await updateGrade(gradeId)}>
            Изменить
          </button>
          <button onClick={async () => await deleteGrade(gradeId)}>
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
