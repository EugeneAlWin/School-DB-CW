import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '../constants/ROLES.js';

export default function Navbar() {
  let navigate = useNavigate();
  if (!localStorage.getItem('USER')) navigate('/login');
  let user = JSON.parse(localStorage.getItem('USER') ?? {});
  return (
    <div
      id='links_container'
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2%',
        width: '100%',
      }}
    >
      <Link to={'/search'}>Учителя и Ученики</Link>
      <Link to={'/journal'}>Журнал</Link>
      {user.role === ROLES.ADMIN && <Link to={'/admin'}>Панель админа</Link>}
      <Link to={'/login'}>Выйти</Link>
    </div>
  );
}
