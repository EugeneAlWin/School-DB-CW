import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  let navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000?login=${login}&password=${password}`
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setStatus(json['login']);
        navigate('/home');
      } else if (response.status === 401) {
        setStatus('Rejected');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      {/* <div>{data ? <p>Dima : {data.Dima}</p> : <p>Loading...</p>}</div> */}
    </>
  );
}

export default LoginPage;
