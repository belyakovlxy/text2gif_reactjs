import React from "react";

function MySvg(props){
    const svgRef = React.createRef();


    if (props.isShow)
    {
        console.log("button clicked in draw_svg");
    }

    function createSvg(styles) {
        return (
            <svg ref={svgRef} style={styles}>
                {createRect()}
                {createText()}
            </svg>
        )
    }

    function setSvgStyle() {
        return({
            width: '200px',
            height: '200px'
        })
    }

    function createRect() {
        return(
            <rect
                fill="black"
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
                {props.textValue}
            </text>
        )
    }

    let styles = setSvgStyle();
    let svgElement = createSvg(styles);

    return (
        svgElement
    )
}

export { MySvg };