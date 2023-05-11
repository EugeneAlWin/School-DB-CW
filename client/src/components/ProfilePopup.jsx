import PropTypes from 'prop-types';
export default function ProfileMini({ name, lastName, surname }) {
  return (
    <div>
      <div
        id='logo_container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <h3>
          {lastName} {name} {surname}
        </h3>
      </div>
      <button id='logout'>Выйти</button>
    </div>
  );
}

ProfileMini.propTypes = {
  imgPath: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  surname: PropTypes.string,
};
