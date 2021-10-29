import React, { useState } from 'react';
import Form from '../components/Form';

function PaintCalculator() {
  const [paintArea, setPaintArea] = useState(0);

  function addArea(area) {
    setPaintArea(paintArea + area);
  };

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
