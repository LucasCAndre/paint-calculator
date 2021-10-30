import React from 'react';
import './Sugestion.css';
import { cansSizes, sqrMtrPerL } from '../utils';

function Sugestion({ paintArea }) {

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
        const sugestion = cansQuantity === 1 
          ? `${cansQuantity} lata de ${can}L`
          : `${cansQuantity} latas de ${can}L`
        sugestions.push(sugestion);
        areaToPaint = sqrMtrs;
      }
    });
    return {sugestions, areaToPaint};
  };
  
  const { sugestions, areaToPaint } = calculator();

  return (
    <>
      <h3>{ `Área total de ${Math.ceil(paintArea)} metros quadrados` }</h3>
      <ul className="sugestions">
        { sugestions.map((sugestion, index) => {
          return <li key={ index } >{ sugestion }</li>
        }) }
        { areaToPaint
          ? <li>1 lata extra de 0,5L</li>
          : null
        }
      </ul>
    </>
  );
};

export default Sugestion;
