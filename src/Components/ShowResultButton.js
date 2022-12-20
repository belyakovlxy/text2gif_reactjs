
function ShowResultButton(props)
{
    const buttonClicked = () =>
    {
        props.buttonClicked();
    }

    return (
        <button id='show_result_button' onClick={buttonClicked}>
            Show result
        </button>
    )
}

export {ShowResultButton}