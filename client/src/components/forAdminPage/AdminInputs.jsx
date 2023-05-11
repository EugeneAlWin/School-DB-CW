import PropTypes from 'prop-types';
import { ROLES } from '../../constants/ROLES.js';
import StudentField from './SelectorFields/StudentField.jsx';
import ParentField from './SelectorFields/ParentField.jsx';
import AdminField from './SelectorFields/AdminField.jsx';
import TeacherField from './SelectorFields/TeacherField.jsx';
import {
  ADMINS_DEFAULT,
  PARENTS_DEFAULT,
  SELECTED_DEFAULT,
  STUDENT_DEFAULT,
  TEACHER_DEFAULT,
} from '../../constants/DEFAULTS_MODELS.js';

export default function AdminInputs({
  selectedUser,
  setSelectedUser,
  selectedUserInfo,
  setSelectedUserInfo,
  userRole,
  setUserRole,
  refreshList,
  userCurrentRole,
}) {
  const createUser = async (roleData, userData) => {
    try {
      const response = await fetch('http://localhost:3000/admin/addusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roleData, userData }),
      });

      if (!response.ok) {
        console.log(await response.json().then((e) => e.message));
        return;
      }
      const createdUser = await response.json();
      console.log('User created:', createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  const updateUser = async (roleData, userData, userId) => {
    try {
      const response = await fetch('http://localhost:3000/admin/updateusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roleData, userData, userId }),
      });

      if (!response.ok) {
        console.log(await response.json().then((e) => e.message));
        return;
      }
      const createdUser = await response.json();
      console.log('User created:', createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  const deleteUser = async (userId, role) => {
    try {
      const response = await fetch('http://localhost:3000/admin/deleteusers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role }),
      });

      if (!response.ok) {
        console.log(await response.json().then((e) => e.message));
        return;
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className='inputs'>
      <div className='fields'>
        <div>
          <input
            type='text'
            name=''
            id='login'
            placeholder='login'
            value={selectedUser.login}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                login: e.target.value,
              })
            }
          />
          <input
            type='password'
            name=''
            id='password'
            placeholder='password'
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                password: e.target.value,
              })
            }
            value={selectedUser.password}
          />
        </div>
        <div>
          <input
            type='number'
            id='id'
            disabled
            placeholder='id'
            value={selectedUser.id}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                id: e.target.value,
              })
            }
          />
          <select
            value={selectedUser.role}
            name='list_of_roles'
            id='list_of_roles'
            onChange={(e) => {
              let role = e.target.value;
              setUserRole(role),
                setSelectedUser({
                  ...selectedUser,
                  role: role,
                });
              let info =
                role === ROLES.ADMIN
                  ? ADMINS_DEFAULT
                  : role === ROLES.PARENT
                  ? PARENTS_DEFAULT
                  : role === ROLES.TEACHER
                  ? TEACHER_DEFAULT
                  : STUDENT_DEFAULT;
              setSelectedUserInfo(info);
            }}
          >
            {Object.keys(ROLES).map((i) => (
              <option key={i} value={i}>
                {ROLES[i]}
              </option>
            ))}
          </select>
        </div>
        {userRole === ROLES.TEACHER && (
          <TeacherField
            userInfo={selectedUserInfo}
            setUserInfo={setSelectedUserInfo}
          />
        )}
        {userRole === ROLES.STUDENT && (
          <StudentField
            userInfo={selectedUserInfo}
            setUserInfo={setSelectedUserInfo}
          />
        )}
        {userRole === ROLES.PARENT && (
          <ParentField
            userInfo={selectedUserInfo}
            setUserInfo={setSelectedUserInfo}
          />
        )}
        {userRole === ROLES.ADMIN && (
          <AdminField
            userInfo={selectedUserInfo}
            setUserInfo={setSelectedUserInfo}
          />
        )}
      </div>
      <br />
      <div id='crud_buttons'>
        <button
          className='crud_button'
          onClick={async () => {
            let roleData = {
              ...selectedUserInfo,
            };
            if (roleData.class) {
              roleData.class = +roleData.class;
            }
            delete roleData.id;
            delete roleData.user_id;

            console.log(roleData);
            await createUser(roleData, {
              login: selectedUser.login,
              password: selectedUser.password,
              role: selectedUser.role,
            });
            await refreshList();
          }}
        >
          Добавить
        </button>
        <button
          className='crud_button'
          disabled={userRole !== userCurrentRole && selectedUser.id != 0}
          onClick={async () => {
            let roleData = {
              ...selectedUserInfo,
            };
            console.log(roleData);
            if (roleData.class) {
              roleData.class = +roleData.class;
            }
            delete roleData.id;
            delete roleData.user_id;

            await updateUser(
              roleData,
              {
                login: selectedUser.login,
                password: selectedUser.password,
                role: selectedUser.role,
              },
              selectedUser.id
            );
            await refreshList();
          }}
        >
          Обновить
        </button>
        <button
          className='crud_button'
          onClick={async () => {
            if (!selectedUserInfo.id) return;
            await deleteUser(selectedUser.id, selectedUser.role);
            await refreshList();
          }}
        >
          Удалить
        </button>
        <button
          className='clear_button'
          onClick={() => {
            setUserRole(ROLES.TEACHER);
            setSelectedUserInfo(TEACHER_DEFAULT);
            setSelectedUser(SELECTED_DEFAULT);
          }}
        >
          Очистить
        </button>
      </div>
    </div>
  );
}

AdminInputs.propTypes = {
  selectedUser: PropTypes.object,
  setSelectedUser: PropTypes.func,
  selectedUserInfo: PropTypes.object,
  setSelectedUserInfo: PropTypes.func,
  userRole: PropTypes.string,
  setUserRole: PropTypes.func,
  refreshList: PropTypes.func,
  userCurrentRole: PropTypes.string,
};
