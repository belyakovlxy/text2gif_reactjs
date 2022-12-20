
import './App.css';
import React, { useRef } from 'react';
import { InputContainer } from './Components/Input/InputContainer';
import { ResultContainer } from './Components/ResultContainer';

import { TextReproductor } from './jslibs/TextReproductor';


function App() {
  console.log('Render App');

  const textrep = new TextReproductor();
  const resultContainerRef = useRef();


  const resetButtonClicked = () => {
    console.log('APP: reset button clicked')
    resultContainerRef.current.resetSvgImg();
  }

  return (
    <>
      <h1>
        TEXT2GIF
      </h1>
      <InputContainer
        textrep={textrep}
        resetButtonCallback={resetButtonClicked}/>
      <div>
        <ResultContainer 
          textrep={textrep}
          ref={resultContainerRef}/>
      </div>
    </>
  );
}

export default App;
