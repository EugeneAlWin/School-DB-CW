import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LoginPage() {
  let navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000?login=${login}&password=${password}`
      );
      if (response.ok) {
        const json = await response.json();
        setStatus(json['login']);
        let entity =
          json.Students ?? json.Parents ?? json.Admins ?? json.Teachers;
        console.log(entity);
        localStorage.setItem(
          'USER',
          JSON.stringify({
            login: json['login'],
            role: json['role'],
            name: entity.name,
            last_name: json.last_name,
            surname: json.surname,
          })
        );
        navigate('/search');
      } else if (response.status === 401) {
        setStatus('Rejected');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    localStorage.removeItem('USER');
  }, []);
  let [login, setLogin] = useState('');
  let [password, setPassword] = useState('');
  return (
    <>
      <h2 id='auth'>Авторизуйтесь</h2>
      <div
        id='auth_container'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          id='login_container'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <label htmlFor='login'>Логин: </label>
          <input
            type='text'
            name='login'
            id='login'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div
          id='password_container'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <label htmlFor='password'>Пароль: </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={async () => fetchUsers()}>Авторизация</button>
      <div>Status: {status}</div>
    </>
  );
}
