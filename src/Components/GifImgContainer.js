import { forwardRef, useImperativeHandle, useState } from "react";
import { sleep } from '../jslibs/DrawSvgText'
import * as gifshot from 'gifshot'

const GifImgContainer = forwardRef((props, ref) => 
{
    console.log('Render GifImgContainer');
    
    const [imgUrl, setImgUrl] = useState('');

    let serializedSvgStart = '<svg xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="400" height="404" fill="black"/><text fill="white" x="20" y="60" font-size="40">';
    let serializedSvgEnd = '</text></svg>'
    let serializedSvg = serializedSvgStart + serializedSvgEnd;

    const fps = 20;
    let frameArray = [];
    let urlFrameArray = [];
    let delay = Number(1000 / fps)



    const getCurrentTextValue = () => {
        return props.getCurrentImageText();
    }

    const getFrame = () => {
        let text = getCurrentTextValue()
        console.log(text)
        serializedSvg = serializedSvgStart + text + serializedSvgEnd;
    }

    const createGif = () => {
        gifshot.width = 400;
        gifshot.height = 400;
        gifshot.createGIF({
            'images': urlFrameArray,
            'gifWidth': 400,
            'gifHeight': 400,
            'frameDuration': Number(delay / 100) 
        },function(obj) {
        if(!obj.error) {
            let im = obj.image;
            setImgUrl(im);
        }
    })}

    const recordFrames = async (recordDuration) => {
        let startTime = new Date().getTime();
        let currentTime = startTime;
        

        console.log('record frames');
        while(currentTime - startTime < recordDuration)
        {
            
            currentTime = new Date().getTime();

            getFrame();
            let svg = new Blob([serializedSvg], {type: "image/svg+xml"});
            let url = URL.createObjectURL(svg);
            setImgUrl(url)

            frameArray.push(svg);
            urlFrameArray.push(url);
            await sleep(delay);


        }

        createGif();
    }

    useImperativeHandle(ref, () => ({
        getCurrentTextValue : getCurrentTextValue,
        recordFrames : recordFrames
    }))
    
    return (
        <>
            <img 
                style={{width:'400px',
                height:'400px',
                backgroundColor:'red',
                display : props.isShow}}
                src={imgUrl}
                >
            </img>
        </>
    )
})

export { GifImgContainer }