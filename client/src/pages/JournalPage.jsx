import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JournalPage() {
  const [selectedClass, setSelectedClass] = useState(3);
  const [listOfStudentsWithGrades, setListOfStudentsWithGrades] = useState([]);
  const [studentsNames, setStudentsNames] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedName, setSelectedName] = useState('');
  const [list, setList] = useState();
  const [currentName, setCurrentName] = useState('');
  let navigate = useNavigate();
  if (!localStorage.getItem('USER')) navigate('/login');
  useEffect(() => {
    async function fetchStudents() {
      const response = await fetch(
        `http://localhost:3000/journal?class=${selectedClass}`
      );
      const parsed = await response.json();
      const { students, listOfStudentsNames } = parsed;
      setStudentsNames(listOfStudentsNames);
      setListOfStudentsWithGrades(students);
      setSelectedName(listOfStudentsNames[0]);
    }
    fetchStudents();
  }, [selectedClass]);

  useEffect(() => {
    const testObj = selectedStudent?.reduce((acc, curr) => {
      if (!(curr.subject in acc)) acc[curr.subject] = [];
      acc[curr.subject].push({
        value: curr.value,
        teacher: curr.teacher,
        date: new Date(curr.date).toLocaleDateString(),
      });
      return acc;
    }, {});
    if (testObj !== null && testObj !== undefined)
      setList(
        Object.keys(testObj)?.map((item) => (
          <tr key={item}>
            <td>{item}</td>
            {testObj[item].map((val, i) => (
              <td
                key={item + i}
                className='tooltip'
                data-tooltip={`Учитель: ${val.teacher.name}. Дата: ${val.date}`}
              >
                {val.value}
              </td>
            ))}
          </tr>
        ))
      );
  }, [selectedStudent]);
  return (
    <div>
      <div className='filter_inputs'>
        <label htmlFor='classes'>Класс: </label>
        <select
          name='classes'
          id='classes'
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
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
  );
}
