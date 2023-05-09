import PropTypes from 'prop-types';

export default function ParentField({ userInfo, setUserInfo }) {
  return (
    <div id='parent_fields'>
      <div>
        <input
          type='text'
          placeholder='Фамилия'
          value={userInfo.surname}
          onChange={(e) => {
            setUserInfo({ ...userInfo, surname: e.target.value });
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
          value={userInfo.last_name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, last_name: e.target.value });
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
      {/* <input
        type='number'
        placeholder='student_id'
        value={userInfo.last_name}
        onChange={(e) => {
          setUserInfo({ ...userInfo, last_name: e.target.value });
        }}
      /> */}
    </div>
  );
}
ParentField.propTypes = {
  userInfo: PropTypes.object,
  setUserInfo: PropTypes.func,
};