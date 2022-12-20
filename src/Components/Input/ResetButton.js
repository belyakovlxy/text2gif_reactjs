import React, {useState} from "react"

function ResetButton (props)
{
    console.log('Render ResetButton');

    const buttonClicked = () => {
        props.buttonClicked();
    }

    return (
        <>
            <button id='reset_button' onClick={buttonClicked}>
                Reset
            </button>
        </>
    )
}

export { ResetButton } 