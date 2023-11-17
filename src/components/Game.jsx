import React, { useState, useEffect } from 'react';
import '../App.css'
import {ModalReceipt} from "./ModalReceipt"
import { Wheel } from 'react-custom-roulette'


const data = [
    { option: '0', style: { backgroundColor: 'green' }},
    { option: '1', style: { backgroundColor: 'white' } },
    { option: '2' },
  ]
function Game() {
    const fakeRecipeData = [{
      id: '1',
      name: 'Паста',
      image: 'https://pulse.imgsmail.ru/imgpreview?mb=pulse&key=pic1135385645347674314',
      ingredients: ['Паста', 'Помидоры', 'Морковь', 'Сыр', 'Огурец', 'Картофель'],
      trueIng: ['Паста', 'Помидоры', 'Сыр']
    }];  
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [balance, setBalance] = useState(10);
    const [gameCount, setGameCount] = useState(3);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSpinClick = () => {
  
      if (!mustSpin && balance>=5) {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        setBalance(prev=>prev-5)
        setGameCount(prev=>prev-1)
      }
    }
    const handleSpinStopped = () => {
      setMustSpin(false);
      setIsModalOpen(true)
    }
  
    return (
      <>
      <header>
        <div>
          <h4>Balance: {balance}</h4>
          <h4>Доступино игр: {gameCount}</h4>
        </div>
      </header>
      <div className='root'>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleSpinStopped}
        />
        <button onClick={handleSpinClick}>Раскрутить!</button>
      </div>
      <ModalReceipt isOpen={isModalOpen} onClose={closeModal} recipe={fakeRecipeData[0]}setBalance={setBalance} />
      </>
    )
  }
  
  export default Game
  