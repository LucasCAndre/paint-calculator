import React, { useEffect, useState } from 'react';
import './wall.css';
import { windowWidth, windowHeight, doorWidth, doorHeight } from '../utils';

function Wall({ parede, addArea }) {
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [windows, setWindows] = useState(0);
  const [doors, setDoors] = useState(0);
  const [hideWarning, setHideWarning] = useState(true);
  const [warning, setWarning] = useState('');
  const [disableDoor, setDisabledDoor] = useState(true);
  const [disableWindow, setDisabledWindow] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [disableForm, setDisableForm] = useState(false);
  const [area, setArea] = useState(0);

  function totalArea() {
    const totalArea = height * width;
    const windowArea = windowHeight * windowWidth;
    const doorArea = doorHeight * doorWidth;
    const finalArea = totalArea - ( doorArea * doors ) - ( windowArea * windows );
    const proportion = finalArea/totalArea * 100;
    if (proportion < 50) {
      setHideWarning(false);
      setWarning(`O total de área das portas e janelas é de ${ Math.ceil(100 - proportion) }% e deve ser no máximo 50% da área de parede`);
    }
    setArea(finalArea);
  }

  function handleClick() {
    addArea(area);
    setDisableForm(true);
    setDisabledDoor(true);
    setDisabledWindow(true);
  };

  function checkButton() {
    if (!hideWarning || area === 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  function checkHeight() {
    if ((height > 15 || height < 1) && height !== '') {
      setHideWarning(false);
      setWarning('Altura não pode ser menor que 1 ou maior que 15 metros!!');
    }
  };

  function checkWidth() {
    if ((width > 15 || width < 1) && width !== '') {
      setHideWarning(false);
      setWarning('Largura não pode ser menor que 1 ou maior que 15 metros!!');
    }
  };

  function checkDoor() {
    if (height < doorHeight + 0.3 || !width) {
      setDisabledDoor(true);
    } else {
      setDisabledDoor(false);
    }
  };

  function checkWindow() {
    if (width < windowWidth || width === '' || height < windowHeight || height === '') {
      setDisabledWindow(true);
    } else {
      setDisabledWindow(false);
    }
  };

  useEffect(() => {
    checkButton();
  }, [hideWarning, height, width, totalArea]);

  useEffect(() => {
    setHideWarning(true);
    checkDoor();
    checkWindow();
    checkHeight();
    checkWidth();
    totalArea();
  }, [height, width, doors, windows]);
  
  return (
    <>
      <h2>{ `Parede${parede}` }</h2>
      <form>
        <label>
          Altura (m)
          <input
            type= 'number'
            value = { height }
            onChange = { (e) => setHeight(e.target.value) }
            placeholder = 'metros'
            disabled = { disableForm }
            required
          />
        </label>
        <br />
        <br />
        <label>
          Largura (m)
          <input 
            type= 'number'
            value = { width }
            onChange = { (e) => setWidth(e.target.value) }
            placeholder = 'metros'
            disabled = { disableForm }
            required
          />
        </label>
        <br />
        <br />
        <label>
          Portas (qtd)
          <input
            type= 'number'
            value = { doors }
            onChange = { (e) => setDoors(e.target.value) }
            placeholder = 'quantidade'
            disabled = { disableDoor }
          />
        </label>
        <br />
        <br />
        <label>
          Janelas (qtd)
          <input
            type= 'number'
            value = { windows }
            onChange = { (e) => setWindows(e.target.value) }
            placeholder = 'quantidade'
            disabled = { disableWindow }
          />
        </label>
        <br />
        <br />
        <button
          type='button'
          disabled = { disableButton }
          onClick = { handleClick }
        >
        Confirma
        </button>
      </form>
      <span hidden = { hideWarning }>{ warning }</span>
    </>
  );
};

export default Wall;
