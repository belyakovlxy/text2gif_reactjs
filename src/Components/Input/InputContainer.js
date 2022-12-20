import React, {useRef} from "react"
import { InputText } from "./InputText";
import { ResetButton } from "./ResetButton";

function InputContainer (props)
{
    console.log('Render InputContainer');
    
    const inputTextElement = useRef();

    const buttonClicked = () => {
        console.log('INPUT CONTAINER: button clicked');
        inputTextElement.current.resetInputTextValue();
        props.resetButtonCallback();
    }

    return (
        <>
            <InputText
                textrep={props.textrep}
                ref={inputTextElement}/>
            <ResetButton 
                buttonClicked={buttonClicked}
            />
        </>
    )
}

export { InputContainer } 