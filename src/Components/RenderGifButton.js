

function RenderGifButton(props)
{
    console.log('render renderbutton')
    const buttonClicked = () =>
    {
        props.buttonClicked();
    }

    return (
        <button id='render_gif_button' onClick={buttonClicked}>
            Render GIF
        </button>
    )
}

export {RenderGifButton}