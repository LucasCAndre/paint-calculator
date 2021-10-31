import React, { useEffect, useState } from 'react';
import './Wall.css';
import { windowWidth, windowHeight, doorWidth, doorHeight } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCheck } from '@fortawesome/free-solid-svg-icons'



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
      setWarning('Altura deve ter entre 1 e 15 metros!!');
    }
  };

  function checkWidth() {
    if ((width > 15 || width < 1) && width !== '') {
      setHideWarning(false);
      setWarning('Largura deve ter entre 1 e 15 metros!!');
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
    if (!disableButton) {
      addArea(area);
    }
  }, [disableButton, area]);

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
    <div className="wall" >
      <h2>{ `Parede ${parede}` }</h2>
      <form>
        <label>
          Altura (m): 
          <input
            min="0"
            type= 'number'
            value = { height }
            onChange = { (e) => setHeight(e.target.value) }
            placeholder = 'metros'
            required
          />
        </label>
        <br />
        <br />
        <label>
          Largura (m): 
          <input
            min="0"
            type= 'number'
            value = { width }
            onChange = { (e) => setWidth(e.target.value) }
            placeholder = 'metros'
            required
          />
        </label>
        <br />
        <br />
        <label>
          Portas (qtd): 
          <input
            min="0"
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
          Janelas (qtd): 
          <input
            min="0"
            type= 'number'
            value = { windows }
            onChange = { (e) => setWindows(e.target.value) }
            placeholder = 'quantidade'
            disabled = { disableWindow }
          />
        </label>
        <br />
        <br />
        {
          disableButton
            ? null
            : <FontAwesomeIcon className="checkIcon" icon={faCheck} />
        }
      </form>
      <span
        hidden = { hideWarning }
        className="warning"
      >
        { warning }
      </span>
    </div>
  );
};

export default Wall;
