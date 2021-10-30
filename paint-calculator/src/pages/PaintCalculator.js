import React, { useEffect, useState } from 'react';
import './paintCalculator.css';
import Sugestion from '../components/Sugestion';
import Wall from '../components/Wall';
import Footer from '../components/Footer';

function PaintCalculator() {
  const [areaOne, setAreaOne] = useState();
  const [areaTwo, setAreaTwo] = useState();
  const [areaThree, setAreaThree] = useState();
  const [areaFour, setAreaFour] = useState();
  // const [sendSugestion, setSendSugestion] = useState(true);

  const paintArea = areaOne + areaTwo + areaThree + areaFour;
console.log(paintArea);

  // useEffect(() => {
  //   if (areaOne && areaTwo && areaThree && areaFour) {
  //     setSendSugestion(true);
  //   }
  // }, [areaOne, areaTwo, areaThree, areaFour]);

  function reloadClick() {
    window.location.reload();
  };

  return (
    <>
      <div className="wall-container" >
        <Wall parede = '1' addArea = { setAreaOne } />
        <br />
        <Wall parede = '2' addArea = { setAreaTwo } />
        <br />
        <Wall parede = '3' addArea = { setAreaThree } />
        <br />
        <Wall parede = '4' addArea = { setAreaFour } />
      </div>
      <button
        className="reload-btn"
        onClick={ reloadClick }
      >
        Limpar tudo
      </button>
      <Sugestion paintArea = { paintArea } />
      <Footer />
    </>
  );
};

export default PaintCalculator;
