import { useState, useEffect } from 'react'


import './App.css'
import Game from './components/Game';
import axios from 'axios';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState();

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedPassword = localStorage.getItem('password');

    if (storedPhoneNumber && storedPassword) {
      axios.post("https://promoapi.shw-platform.com/landing/participant", 
      {id:"05781788-c6ce-46c7-82e7-c93491ed9e2f",promotion:"f354170d-6ee3-4b06-9f1c-eeb38099ef2a"},
      {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MGVhMDcwMi1hYjM2LTRmNDAtYjcyYy01NDBmOTI3ODZkMTEiLCJpYXQiOjE3MDA0NzY5NTQsImV4cCI6MTcwMzE5ODU1NH0.GZh-6TkNrdiVJHqWgD7PdK0FcjEqMhXuwV-iSstNz6I` }
      }).then((res)=>setBalance(res.data.participant.totalScore+10))
      const lastLoginDate = localStorage.getItem('dateAdd');

      if (lastLoginDate) {
        const currentDate = new Date();
        const lastDate = new Date(lastLoginDate);

        const timeDifference = currentDate - lastDate;

        if (timeDifference > 24 * 60 * 60 * 1000 && localStorage.getItem('gameCount') == 0) {
          localStorage.setItem('gameCount', 3);
        }
      }

      setIsLoggedIn(true);
    }
    else {

    }
  }, []);

  const handleLogin = () => {
    const phoneNumberRegex = /^\d{11}$/;
    if (!phoneNumber.match(phoneNumberRegex)) {
      alert('Ошибка валидации номера');
      return;
    }
    axios.post("https://promoapi.shw-platform.com/landing/participant", 
    {id:"05781788-c6ce-46c7-82e7-c93491ed9e2f",promotion:"f354170d-6ee3-4b06-9f1c-eeb38099ef2a"},
    {
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MGVhMDcwMi1hYjM2LTRmNDAtYjcyYy01NDBmOTI3ODZkMTEiLCJpYXQiOjE3MDA0NzY5NTQsImV4cCI6MTcwMzE5ODU1NH0.GZh-6TkNrdiVJHqWgD7PdK0FcjEqMhXuwV-iSstNz6I` }
    }).then((res)=>setBalance(res.data.participant.totalScore))

    
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('password', 'any_password');
    
    localStorage.setItem('gameCount', 3);
    localStorage.setItem('dateAdd', new Date().toISOString());
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <div >
        </div>
      ) : (
        <div style={{ position: 'absolute', background: 'white', zIndex: 20, width: '100%', height: '100%' }}>
          <p>Введите номер телефона:</p>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p>Введите пароль:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Войти</button>
        </div>
      )}
      <Game balance={balance} setBalance={setBalance}/>
    </>
  );
};

export default App;