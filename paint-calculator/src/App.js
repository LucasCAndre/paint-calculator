import './App.css';
import React from 'react';
import Header from './components/Header';
import PaintCalculator from './pages/PaintCalculator';

function App() {
  return (
    <div className="App">
      <Header />
      <PaintCalculator />
    </div>
  );
}

export default App;
