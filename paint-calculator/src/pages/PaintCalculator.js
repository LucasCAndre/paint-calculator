import React, { useState } from 'react';
import Sugestion from '../components/Sugestion';
import Wall from '../components/Wall';
import { cansSizes, sqrMtrPerL } from '../utils';

function PaintCalculator() {
  const [areaOne, setAreaOne] = useState(0);
  const [areaTwo, setAreaTwo] = useState(0);
  const paintArea = areaOne + areaTwo;

  return (
    <>
      <Wall parede = '1' addArea = { setAreaOne } />
      <br />
      <Wall parede = '2' addArea = { setAreaTwo } />
      <h1>{ paintArea }</h1>
      <Sugestion paintArea = { paintArea } />
    </>
  );
};

export default PaintCalculator;
