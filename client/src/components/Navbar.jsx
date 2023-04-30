import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div id='links_container'>
      <Link>Учителя</Link>
      <Link>Ученики</Link>
      <Link>Оценки</Link>
    </div>
  );
}
