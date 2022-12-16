import React, { useState } from 'react';
import { TextChangesHolder } from './TextChangeHolder';


function InputText(props) {
    const tch = new TextChangesHolder();

    const [inputValue, setInputValue] = useState(props.inputTextValue);
    const [oldInputTextValue, setOldInputTextValue] = useState('');

    const updateTextReproductor = (tchAdditions, tchDeletions) => {
        let date = new Date().getTime();

        if (tchAdditions.length > 0)
        {
            props.textrep.pushTchArray(tchAdditions, date, true);
        }
        if (tchDeletions.length > 0)
        {
            props.textrep.pushTchArray(tchDeletions, date, false);
        }
        console.log(props.textrep)
    }

    const updateOldInputValue = (evt) => {
        const currentValue = evt.target.value;

        tch.defineChanges(oldInputTextValue, currentValue);
        updateTextReproductor(tch.getAdditions(), tch.getDeletions());
        tch.clearClass();

        setInputValue(currentValue)
        setOldInputTextValue(currentValue);
    }

    return (
        <>
            <input id='inputText' value={inputValue} 
            onChange={evt => updateOldInputValue(evt)}/>
        </>
        
    );
}

export { InputText }