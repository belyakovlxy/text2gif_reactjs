function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function splice(str, idx, rem, symb) {
    return str.slice(0, idx) + symb + str.slice(idx + Math.abs(rem));
};

class TextDrawer {
    constructor (svgTextElem) {
        this.svgTextElem = svgTextElem;
    }

    async drawText(textRep, MyText) {
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
            MyText = text;
        }
        
    }

}

export {TextDrawer, sleep, splice}