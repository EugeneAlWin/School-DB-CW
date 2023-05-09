import PropTypes from 'prop-types';
import { ROLES } from '../../constants/ROLES.js';
import StudentField from './SelectorFields/StudentField.jsx';
import ParentField from './SelectorFields/ParentField.jsx';
import AdminField from './SelectorFields/AdminField.jsx';
import TeacherField from './SelectorFields/TeacherField.jsx';

export default function AdminInputs({
  selectedUser,
  setSelectedUser,
  selectedUserInfo,
  setSelectedUserInfo,
  userRole,
  setUserRole,
}) {
  return (
    <div className='inputs'>
      <div className='fields'>
        <div>
          <input
            type='text'
            name=''
            id='login'
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
              setUserRole(e.target.value),
                setSelectedUser({
                  ...selectedUser,
                  role: e.target.value,
                });
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
};
