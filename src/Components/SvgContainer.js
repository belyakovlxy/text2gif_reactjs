
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import reactSvgToImage from "react-svg-to-image";
import { splice, sleep } from "../jslibs/DrawSvgText"

function DrawSvg(params)
{

    function createSvg(styles) {
        return (
            <svg style={styles} id={'#svg_element'}>
                {createRect()}
                {createText()}
            </svg>
        )
    }

    function setSvgStyle() {

        return({
            width: '400px',
            height: '400px'
        })
    }

    function createRect() {
        return(
            <rect
                fill={params.color}
                width={'100%'}
                height={'100%'}
                >
            </rect>
        )
    }

    function createText() {
        return(
            <text
                fill="white"
                x={'20px'}
                y={'60px'}
                fontSize={'40px'}
            >
                {params.textValue}
            </text>
        )
    }

    let styles = setSvgStyle();
    let svgElement = createSvg(styles);

    return (
        svgElement
    )
}


const SvgContainer = forwardRef((props, ref) => 
{
    const [currentTextValue, setCurrentTextValue] = useState("");

    console.log('Render SvgContainer');
    const [svgElenemt, setSvgElement] = useState(DrawSvg({
        color: 'black',
        textValue: ''
    }))

    const redrawSvg = () => {
        drawText(props.textrep);
    }

    const clearSvg = () => {
        setCurrentTextValue("");
        setSvgElement(DrawSvg({
            color: 'black',
            textValue: ''
        }));
    }

    const getCurrentImageText = () => {
        return currentTextValue;
    }

    useImperativeHandle(ref, () => ({
        redrawSvg : redrawSvg,
        clearSvg : clearSvg,
        getCurrentImageText : getCurrentImageText
    }))

    const drawText = async (textRep) => {
        let letters = textRep.letters;
        let text = "";
    
        for (let i = 0; i < letters.length; i++)
        {
            console.log(i);
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
            setSvgElement(DrawSvg({
                color: 'black',
                textValue: text
            }));
            
            setCurrentTextValue(text);
        }

    }

    
    return (
        <>
            {svgElenemt}
        </>
    )
});

export {SvgContainer}



