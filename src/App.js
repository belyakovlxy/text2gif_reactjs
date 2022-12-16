
import './App.css';
import { InputText } from './InputText';
import React, { useState } from 'react';
import { TextReproductor } from './TextReproductor';
import { sleep, splice } from './DrawSvgText';
import { MySvg } from './draw_svg'

function App() {
  const textReproductor = new TextReproductor();
  console.log("RENDER TIME");
  const [textValue, setTextValue] = useState('');
  const [inputTextValue, setInputTextValue] = useState('');

  const showResultFunction = async () => {
      console.log('button clicked')
      console.log(textReproductor)
      setTextValue('');
      console.log(textReproductor)
      let letters = textReproductor.letters;
      let text = "";

      for (let i = 0; i < letters.length; i++)
      {
          if (i > 0)
          {
              await sleep(letters[i].getTime() - letters[i - 1].getTime());
          }
          
          if (letters[i].getAddFlag())
          {
              text = splice(text, letters[i].getIndex(), 0, letters[i].getSymbol());
          }
          else
          {
              text = splice(text, letters[i].getIndex(), 1, '');
          } 
          setTextValue(text);
      }
  }


  const resetText = () => {
    setInputTextValue('');
    setTextValue('');

    console.log('text: ' + inputTextValue)
  }


  return (
    <>
      <h1 className='logo'>
        TEXT2GIF
      </h1>
      <div>
        <InputText 
          textrep={textReproductor}
          inputTextValue={inputTextValue}/>
          <button id='restart_typing_button'onClick={resetText}>
              Restart typing
          </button>
      </div>

      <div>
        <button id='show_result_button' onClick={showResultFunction}>See result</button>
        <button id='render_gif_button'>Render GIF</button>
      </div>

      <div id='svg_continer'>
        <MySvg textValue={textValue}/>
      </div>

      <div id='img_container'>
        
      </div>

      
    </>
    
  );
}

export default App;
