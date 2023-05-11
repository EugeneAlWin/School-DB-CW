import ss from './bio.module.css';
import PropTypes from 'prop-types';

export default function TeacherBioPopup({ info, closeCallback }) {
  return (
    <div
      id={ss.container}
      onClick={(e) => {
        if (e.target.id === ss.container) closeCallback(false);
      }}
    >
      <div id={ss.modal}>
        <div style={{ display: 'flex' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 className={ss.object_name}>
              {info.surname} {info.name} {info.lastName}
            </h3>
            <h4>Преподает предмет: {info.subject}</h4>
            <h4>Телефон: {info.phone}</h4>
            <h4>Email: {info.email}</h4>
          </div>
        </div>
        <div>{info.description}</div>
      </div>
    </div>
  );
}

TeacherBioPopup.propTypes = {
  info: PropTypes.object,
  closeCallback: PropTypes.func,
};
