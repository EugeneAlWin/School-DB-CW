import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TeacherBioPopup from '../components/BioPopups/TeacherBioPopup.jsx';
import StudentBioPopup from '../components/BioPopups/StudentBioPopup.jsx';
const ROLES = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
};
export default function SearchPage() {
  const [users, setUsers] = useState([]);
  const [isTeacherBioOpen, setIsTeacherBioOpen] = useState(false);
  const [isStudentBioOpen, setIsStudentBioOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});

  async function fetchUsersForSearch() {
    try {
      const res = await fetch('http://localhost:3000/search');
      let list = await res.json();
      setUsers(list);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUsersForSearch();
  }, []);

  return (
    <div className='list_of_users'>
      <table border={1} width={'100%'}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <ListItem
              info={item.teacher ?? item.students}
              role={item.role}
              key={item.id}
              setIsStudentBioOpen={setIsStudentBioOpen}
              setIsTeacherBioOpen={setIsTeacherBioOpen}
              setSelectedUserInfo={setSelectedUserInfo}
            />
          ))}
        </tbody>
      </table>

      {isTeacherBioOpen && (
        <TeacherBioPopup
          info={selectedUserInfo}
          closeCallback={setIsTeacherBioOpen}
        />
      )}
      {isStudentBioOpen && (
        <StudentBioPopup
          info={selectedUserInfo}
          closeCallback={setIsStudentBioOpen}
        />
      )}
    </div>
  );
}

function ListItem({
  info,
  role,
  setIsStudentBioOpen,
  setIsTeacherBioOpen,
  setSelectedUserInfo,
}) {
  return (
    <tr
      className='list_item'
      style={{ cursor: 'pointer' }}
      onClick={() => {
        switch (role) {
          case ROLES.TEACHER:
            setSelectedUserInfo(info);
            setIsTeacherBioOpen(true);
            break;
          case ROLES.STUDENT:
            setSelectedUserInfo(info);
            setIsStudentBioOpen(true);
            break;
        }
      }}
    >
      <td className='name'>{info.name}</td>
      <td className='name'>{info.lastName}</td>
      <td className='name'>{info.surname}</td>
      <td className='role'>{role}</td>
    </tr>
  );
}

ListItem.propTypes = {
  info: PropTypes.object,
  role: PropTypes.string,
  setIsStudentBioOpen: PropTypes.func,
  setIsTeacherBioOpen: PropTypes.func,
  setSelectedUserInfo: PropTypes.func,
};
