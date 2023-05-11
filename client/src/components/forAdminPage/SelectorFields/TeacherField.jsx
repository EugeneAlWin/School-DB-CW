import PropTypes from 'prop-types';
export default function TeacherField({ userInfo, setUserInfo }) {
  return (
    <div id='teacher_fields'>
      <div>
        <input
          type='text'
          placeholder='Фамилия'
          value={userInfo.last_name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, last_name: e.target.value });
          }}
        />
        <input
          type='text'
          placeholder='Имя'
          value={userInfo.name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, name: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Отчество'
          value={userInfo.surname}
          onChange={(e) => {
            setUserInfo({ ...userInfo, surname: e.target.value });
          }}
        />
        <input
          type='tel'
          id='phone'
          placeholder='Телефон'
          value={userInfo.phone}
          onChange={(e) => {
            setUserInfo({ ...userInfo, phone: e.target.value });
          }}
        />
      </div>
      <div>
        <input
          type='email'
          placeholder='email'
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
        <input
          type='number'
          placeholder='subject_id'
          value={userInfo.subject_id}
          onChange={(e) =>
            setUserInfo({ ...userInfo, subject_id: +e.target.value })
          }
        />
      </div>
    </div>
  );
}

TeacherField.propTypes = {
  userInfo: PropTypes.object,
  setUserInfo: PropTypes.func,
};
