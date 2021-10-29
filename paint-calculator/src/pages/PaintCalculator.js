import React, { useEffect, useState } from 'react';
import './paintCalculator.css';
import Sugestion from '../components/Sugestion';
import Wall from '../components/Wall';

function PaintCalculator() {
  const [areaOne, setAreaOne] = useState();
  const [areaTwo, setAreaTwo] = useState();
  const [areaThree, setAreaThree] = useState();
  const [areaFour, setAreaFour] = useState();
  const [sendSugestion, setSendSugestion] = useState(false);

  const paintArea = areaOne + areaTwo + areaThree + areaFour;

  useEffect(() => {
    if (areaOne && areaTwo && areaThree && areaFour) {
      setSendSugestion(true);
    }
  }, [areaOne, areaTwo, areaThree, areaFour]);

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
      {
        sendSugestion
          ? <Sugestion paintArea = { paintArea } />
          : null
      }
    </>
  );
};

export default PaintCalculator;
