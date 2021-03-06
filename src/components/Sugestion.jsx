import React from 'react';
import PropTypes from 'prop-types';
import './Sugestion.css';
import { cansSizes, sqrMtrPerL } from '../utils';

function Sugestion({ paintArea }) {
  function paintCan(sqrMtrs, canSize) {
    const areaPerCan = canSize * sqrMtrPerL;
    if (sqrMtrs < areaPerCan) {
      return { sqrMtrs };
    }
    const cansQuantity = Math.floor(sqrMtrs / areaPerCan);
    const leftOver = sqrMtrs - (cansQuantity * sqrMtrPerL * canSize);
    return { sqrMtrs: leftOver, cansQuantity };
  }

  function calculator() {
    const sugestions = [];
    let areaToPaint = paintArea;
    cansSizes.forEach((canSize, index) => {
      const { sqrMtrs, cansQuantity } = paintCan(areaToPaint, canSize);
      if (cansQuantity) {
        let sugestion = cansQuantity === 1
          ? `${cansQuantity} lata de ${canSize}L`
          : `${cansQuantity} latas de ${canSize}L`;
        if (index === cansSizes.length - 1 && sqrMtrs) {
          sugestion = `${cansQuantity + 1} latas de ${canSize}L`;
          areaToPaint = 0;
        } else {
          areaToPaint = sqrMtrs;
        }
        sugestions.push(sugestion);
      }
    });
    return { sugestions, areaToPaint };
  }

  const { sugestions, areaToPaint } = calculator();

  return (
    <>
      <h3>{ `Área total de ${Math.ceil(paintArea)} metros quadrados` }</h3>
      <ul className="sugestions">
        { sugestions.map((sugestion) => <li key={sugestion}>{sugestion}</li>) }
        { areaToPaint
          ? <li>1 lata de 0,5L</li>
          : null }
      </ul>
    </>
  );
}

Sugestion.propTypes = {
  paintArea: PropTypes.number.isRequired,
};

export default Sugestion;
