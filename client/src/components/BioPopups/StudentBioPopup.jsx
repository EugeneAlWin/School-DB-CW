import ss from './bio.module.css';
import PropTypes from 'prop-types';

export default function StudentBioPopup({ info, closeCallback }) {
  return (
    <div
      id={ss.container}
      onClick={(e) => {
        if (e.target.id === ss.container) {
          closeCallback(false);
        }
      }}
    >
      <div id={ss.modal}>
        <div style={{ display: 'flex' }}>
          <img src={''} alt='photo' style={{ width: '50%' }} />
          <div style={{ textAlign: 'left' }}>
            <h3 className={ss.object_name}>
              {info.surname} {info.name} {info.lastName}
            </h3>
            <h4>Класс: {info.class}</h4>
            <h4>Телефон: {info.phone}</h4>
            <h4>Email: {info.email}</h4>
            {/* Родители? */}
          </div>
        </div>
        <div>{info.description}</div>
      </div>
    </div>
  );
}
StudentBioPopup.propTypes = {
  info: PropTypes.object,
  closeCallback: PropTypes.func,
};
