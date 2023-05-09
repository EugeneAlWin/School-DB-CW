import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TeacherBioPopup from '../components/BioPopups/TeacherBioPopup.jsx';
import StudentBioPopup from '../components/BioPopups/StudentBioPopup.jsx';
import { ROLES } from '../constants/ROLES.js';
import { useNavigate } from 'react-router-dom';
export default function SearchPage() {
  let navigate = useNavigate();
  if (!localStorage.getItem('USER')) navigate('/login');
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
              info={item.Teachers ?? item.Students}
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
      <td className='name'>{info.last_name}</td>
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
