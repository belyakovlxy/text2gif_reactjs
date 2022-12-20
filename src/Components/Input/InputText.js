import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TextChangesHolder } from '../../jslibs/TextChangeHolder';


const InputText = forwardRef((props, ref) => {
    console.log("Render InputText");
    const tch = new TextChangesHolder();

    const [inputValue, setInputValue] = useState('');
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

    const resetInputTextValue = () => {
        setInputValue('');
        setOldInputTextValue('');
        props.textrep.clearClass();
    }

    useImperativeHandle(ref, () => ({
        resetInputTextValue: resetInputTextValue
    }))

    return (
        <>
            <input id='inputText' value={inputValue} 
            onChange={evt => updateOldInputValue(evt)}/>
        </>
        
    );
});

export { InputText }