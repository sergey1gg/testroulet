import React, { useState, useEffect } from 'react';
import '../App.css'

export const ModalReceipt = ({ isOpen, onClose, recipe, setBalance }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setSelectedIngredients([]);
      setShowSuccess(false);
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
      if(!showSuccess){
      const isCorrect = JSON.stringify(selectedIngredients.sort()) === JSON.stringify(recipe.trueIng.sort());
      if (isCorrect) {
        setBalance((prev) => prev + 10);
        setShowSuccess(true);
      } else {
        alert("Ошибка")
        onClose()
      }
    }
    }
  };

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
        {showSuccess && (
          <div>
            <p className="success-message">Вы угадали!</p>
            <button>Скачать рецепт</button>
          </div>
        )}
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
