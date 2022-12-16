
class Letter {
    constructor (symbol, index, timing, isAdd)
    {
        this.symbol = symbol;
        this.index = index;
        this.timing = timing;
        this.isAdd = isAdd;
    }

    setLetter (symbol, index, timing, isAdd)
    {
        this.symbol = symbol;
        this.index = index;
        this.timing = timing;
        this.isAdd = isAdd;
    }

    getSymbol ()
    {
        return this.symbol;
    }

    getIndex ()
    {
        return this.index;
    }

    getTime ()
    {
        return this.timing;
    }

    getAddFlag ()
    {
        return this.isAdd;
    }
}

const arrayTiming = 3;

class TextReproductor
{
    constructor ()
    {
        this.letters = [];
    }

    pushLetter(symbol, index, timing, isAdd)
    {
        const letter = new Letter(symbol, index, timing, isAdd);
        this.letters.push(letter);
    }

    pushLetterArray(symbolArray, firstIndex, timing, isAdd)
    {
        for (let i = 0; i < symbolArray.length; ++i)
        {
            this.pushLetter(symbolArray[i], firstIndex + i, timing + i * arrayTiming, isAdd);
        }
    }

    pushTchArray(textHolderArray, timing, isAdd)
    {
        for (let i = 0; i < textHolderArray.length; ++i)
        {
            this.pushLetter(textHolderArray[i].getSymbol(), textHolderArray[i].getIndex(), timing + i * arrayTiming, isAdd);
        }
    }

    clearClass () 
    {
        while (this.letters.length > 0)
        {
            this.letters.pop();
        }
    }
}

export {TextReproductor};
export {Letter}