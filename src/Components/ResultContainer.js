import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { ShowResultButton } from "./ShowResultButton"
import { RenderGifButton } from "./RenderGifButton";
import { SvgContainer } from "./SvgContainer";
import { GifImgContainer } from "./GifImgContainer";
import { TextReproductor } from "../jslibs/TextReproductor";

const ResultContainer = forwardRef((props, ref) =>
{
    console.log('Render ResultContainer');
    const svgRef = useRef();
    const gifImgRef = useRef();
    let recordDuration = 0;
    

    const [isShowGifImg, setIsShowGifImg] = useState('none');

    const showResultButtonClicked = () => {
        console.log('show result button clicked');
        svgRef.current.redrawSvg();
    }

    const setCurrentImageText = () => {
        return svgRef.current.getCurrentImageText();
    }

    const renderGifButtonClicked = () => {
        setIsShowGifImg('');
        console.log('render gif button clicked');

        svgRef.current.redrawSvg();
        gifImgRef.current.getCurrentTextValue();

        if (props.textrep.letters.length > 0)
        {
            let lastTm = props.textrep.letters[props.textrep.letters.length - 1].getTime();
            recordDuration = lastTm - props.textrep.letters[0].getTime() + 1000; 
            
            gifImgRef.current.recordFrames(recordDuration);
        }
    }

    const resetSvgImg = () => {
        svgRef.current.clearSvg();
        setIsShowGifImg('none');
    }

    useImperativeHandle(ref, () => ({
        resetSvgImg : resetSvgImg,
    }))

    return (
        <>
            <ShowResultButton buttonClicked={showResultButtonClicked}/>
            <RenderGifButton buttonClicked={renderGifButtonClicked}/>
            <div>
                <SvgContainer
                    ref={svgRef}
                    textrep={props.textrep}/>
                <GifImgContainer 
                    ref={gifImgRef}
                    isShow={isShowGifImg}
                    recordDuration={recordDuration}
                    getCurrentImageText={setCurrentImageText}/>
            </div>
        </>
    )
})

export {ResultContainer}