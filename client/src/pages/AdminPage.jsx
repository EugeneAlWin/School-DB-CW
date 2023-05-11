import { useEffect, useState } from 'react';
import { ROLES } from '../constants/ROLES.js';
import AdminInputs from '../components/forAdminPage/AdminInputs.jsx';
import { useNavigate } from 'react-router-dom';
import { TEACHER_DEFAULT } from '../constants/DEFAULTS_MODELS.js';

export default function AdminPage() {
  let navigate = useNavigate();
  const user = localStorage.getItem('USER');
  useEffect(() => {
    if (!user) navigate('/login');
    if (JSON.parse(user).role !== ROLES.ADMIN) navigate('/search');
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    login: '',
    password: '',
    role: ROLES.TEACHER,
    id: '',
  });
  const [selectedUserInfo, setSelectedUserInfo] = useState(TEACHER_DEFAULT);
  const [userRole, setUserRole] = useState(ROLES.TEACHER);
  const [userCurrentRole, setUserCurrentRole] = useState(ROLES.TEACHER);

  async function fetchAllUsers() {
    try {
      const res = await fetch('http://localhost:3000/admin');
      let list = await res.json();
      setUsers(list);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div className='list_of_users'>
        <table border={1} width={'100%'}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Отчество</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              let info =
                user.Teachers ?? user.Students ?? user.Admins ?? user.Parents;
              return (
                <tr
                  key={user.id}
                  className='list_item'
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedUser(user);
                    setSelectedUserInfo(info);
                    setUserRole(user.role);
                    setUserCurrentRole(user.role);
                  }}
                >
                  <td className='name'>{info.name}</td>
                  <td className='surname'>{info.surname}</td>
                  <td className='last_name'>{info.last_name}</td>
                  <td className='role'>{info.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AdminInputs
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedUserInfo={selectedUserInfo}
        setSelectedUserInfo={setSelectedUserInfo}
        userRole={userRole}
        setUserRole={setUserRole}
        refreshList={fetchAllUsers}
        userCurrentRole={userCurrentRole}
      />
    </div>
  );
}
