import React, { useState } from 'react';
import Form from '../components/Form';
import { cansSizes, sqrMtrPerL } from '../utils';

function PaintCalculator() {
  const [paintArea, setPaintArea] = useState(0);

  function addArea(area) {
    setPaintArea(paintArea + area);
  };

  function cans(sqrMtrs, canSize) {
    const areaPerCan = canSize * sqrMtrPerL;
    if (sqrMtrs < areaPerCan) {
      return { sqrMtrs }
    }
    const cansQuantity = Math.floor(sqrMtrs / areaPerCan);
    const leftOver = sqrMtrs - (cansQuantity * sqrMtrPerL * canSize);
    return { sqrMtrs: leftOver, cansQuantity };
  };

  function calculator() {
    const sugestions = [];
    let areaToPaint = paintArea
    cansSizes.forEach((can) => {
      const {sqrMtrs, cansQuantity} = cans(areaToPaint, can);
      if (cansQuantity) {
        const sugestion = `${cansQuantity} latas de ${can}L`;
        sugestions.push(sugestion);
        areaToPaint = sqrMtrs;
      }
    });
    return {sugestions, areaToPaint};
  };

  console.log(calculator());
  return (
    <>
      <Form parede = '1' addArea = { addArea } />
      <br />
      <Form parede = '2' addArea = { addArea } />
      <h1>{ paintArea }</h1>
    </>
  );
};

export default PaintCalculator;
