import React, { useEffect, useState } from 'react';
import './PaintCalculator.css';
import Sugestion from '../components/Sugestion';
import Wall from '../components/Wall';
import Footer from '../components/Footer';

function PaintCalculator() {
  const [areaOne, setAreaOne] = useState();
  const [areaTwo, setAreaTwo] = useState();
  const [areaThree, setAreaThree] = useState();
  const [areaFour, setAreaFour] = useState();
  const [paintArea, setPaintArea] = useState();
  const [sendSugestion, setSendSugestion] = useState(false);
  const [disableConfirmBtn, setDisableConfirmBtn] = useState(true);

  function handleSugestionClick() {
    setSendSugestion(true);
    const allArea = areaOne + areaTwo + areaThree + areaFour;
    setPaintArea(allArea);
  };

  function reloadClick() {
    window.location.reload();
  };

  function disAbleBtn() {
    const checkIcons = document.querySelectorAll('.checkIcon');
    if (checkIcons.length === 4) {
      setDisableConfirmBtn(false);
    } else {
      setDisableConfirmBtn(true);
    }
  };

  useEffect(() => {
    setSendSugestion(false);
    disAbleBtn();
  }, [areaOne, areaTwo, areaThree, areaFour]);

  return (
    <>
      <div className="wall-container" >
        <Wall parede = '1' addArea = { setAreaOne } />
        <Wall parede = '2' addArea = { setAreaTwo } />
        <Wall parede = '3' addArea = { setAreaThree } />
        <Wall parede = '4' addArea = { setAreaFour } />
      </div>
      <button
        className="reload-btn"
        onClick={ reloadClick }
      >
        Limpar tudo
      </button>
      <button
        disabled = { disableConfirmBtn }
        className="calculator-btn"
        onClick={ handleSugestionClick }
      >
        Calcular
      </button>
      {
        sendSugestion
        ? <Sugestion paintArea = { paintArea } />
        : null
      }
      <Footer />
    </>
  );
};

export default PaintCalculator;
