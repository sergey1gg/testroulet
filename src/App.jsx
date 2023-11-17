import { useState, useEffect } from 'react'


import './App.css'
import { ModalReceipt } from './components/ModalReceipt';
import Game from './components/Game';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedPassword = localStorage.getItem('password');

    if (storedPhoneNumber && storedPassword) {
      
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
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('password', 'any_password');
    localStorage.setItem('balance', 10);
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
      <Game />
    </>
  );
};

export default App;