import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Wall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  windowWidth, windowHeight, doorWidth, doorHeight,
} from '../utils';

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
    const areaTotal = height * width;
    const windowArea = windowHeight * windowWidth;
    const doorArea = doorHeight * doorWidth;
    const finalArea = areaTotal - (doorArea * doors) - (windowArea * windows);
    const proportion = (finalArea / areaTotal) * 100;
    if (proportion < 50) {
      setHideWarning(false);
      setWarning(`O total de área das portas e janelas é de ${Math.ceil(100 - proportion)}% e deve ser no máximo 50% da área de parede`);
    }
    setArea(finalArea);
  }

  function checkButton() {
    if (!hideWarning || area === 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }

  function checkHeight() {
    if ((height > 15 || height < 1) && height !== '') {
      setHideWarning(false);
      setWarning('Altura deve ter entre 1 e 15 metros!!');
    }
  }

  function checkWidth() {
    if ((width > 15 || width < 1) && width !== '') {
      setHideWarning(false);
      setWarning('Largura deve ter entre 1 e 15 metros!!');
    }
  }

  function checkDoor() {
    if (height < doorHeight + 0.3 || !width) {
      setDisabledDoor(true);
      setDoors(0);
    } else {
      setDisabledDoor(false);
    }
  }

  function checkWindow() {
    if (width < windowWidth || width === '' || height < windowHeight || height === '') {
      setDisabledWindow(true);
      setWindows(0);
    } else {
      setDisabledWindow(false);
    }
  }

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
    <div className="wall">
      <h2>{ `Parede ${parede}` }</h2>
      <form>
        <label htmlFor="height">
          Altura (m):
          <input
            id="height"
            min="0"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="metros"
            required
          />
        </label>
        <br />
        <br />
        <label htmlFor="width">
          Largura (m):
          <input
            id="width"
            min="0"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="metros"
            required
          />
        </label>
        <br />
        <br />
        <label htmlFor="door">
          Portas (qtd):
          <input
            id="door"
            min="0"
            type="number"
            value={doors}
            onChange={(e) => setDoors(e.target.value)}
            placeholder="quantidade"
            disabled={disableDoor}
          />
        </label>
        <br />
        <br />
        <label htmlFor="window">
          Janelas (qtd):
          <input
            id="window"
            min="0"
            type="number"
            value={windows}
            onChange={(e) => setWindows(e.target.value)}
            placeholder="quantidade"
            disabled={disableWindow}
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
        hidden={hideWarning}
        className="warning"
      >
        { warning }
      </span>
    </div>
  );
}

Wall.propTypes = {
  parede: PropTypes.string.isRequired,
  addArea: PropTypes.func.isRequired,
};

export default Wall;
