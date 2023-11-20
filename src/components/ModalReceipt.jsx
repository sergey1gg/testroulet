import React, { useState, useEffect } from 'react';
import '../App.css'
import axios from 'axios';

export const ModalReceipt = ({ isOpen, onClose, recipe, setBalance, balance }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLose, setShowLose] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setSelectedIngredients([]);
      setShowSuccess(false);
      setShowLose(false)
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft === 0) {
      onClose();
    }
  }, [timeLeft, onClose]);

  const handleIngredientClick = (ingredient) => {
    const isSelected = selectedIngredients.includes(ingredient);

    if (isSelected) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  const handleSubmit = () => {
    if (selectedIngredients.length === 0) {
      alert('Необходимо выбрать ингредиенты');
    } else {
      if (!showSuccess) {
        const isCorrect = JSON.stringify(selectedIngredients.sort()) === JSON.stringify(recipe.trueIng.sort());
        if (isCorrect) {
          setBalance((prev) => prev + 5);
          setShowSuccess(true);
        } else {
          setBalance((prev) => prev - 5);
          setShowLose(true)
        }
      }
    }
  };
  
  useEffect(() => {
    if(isOpen){
      axios.post(
        "https://promoapi.shw-platform.com/landing/game",
        {
          participant: "66ca9074-57f2-41fb-be42-b2bf55518199",
          promotion: "f354170d-6ee3-4b06-9f1c-eeb38099ef2a",
          game: "de5fdeb3-e7a7-446d-ba93-9a9d0dd3a63d",
          score: balance,
        },
        {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MGVhMDcwMi1hYjM2LTRmNDAtYjcyYy01NDBmOTI3ODZkMTEiLCJpYXQiOjE3MDA0NzY5NTQsImV4cCI6MTcwMzE5ODU1NH0.GZh-6TkNrdiVJHqWgD7PdK0FcjEqMhXuwV-iSstNz6I` }
        }
      ).then((res) => console.log(res.data, balance));
    }
  }, [balance]);
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div onClick={() => onClose()} style={{fontWeight: 'bold', cursor: 'pointer'}}>X</div>
        <p>Осталось: {formatTime(timeLeft)}</p>
        
        </div>
        <img src={recipe.image} alt={recipe.name} />
        <h2>{recipe.name}</h2>
        {showSuccess ? (
          <div>
            <p className="success-message">Вы угадали!</p>
            <button>Скачать рецепт</button>
          </div>
        ): showLose?(
          <div>
            <p className="success-message">Ошибка, вы проиграли</p>
          </div>): ''}
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className={selectedIngredients.includes(ingredient) ? 'selected' : ''}
              onClick={() => handleIngredientClick(ingredient)}
            >
              {ingredient}
            </li>
          ))}
        </ul>

        <button onClick={handleSubmit}>Отправить ответ</button>
        
      </div>
    </div>
  );
};
