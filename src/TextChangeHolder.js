class Paire {
    constructor (symbol, index) {
        this.symbol = symbol;
        this.index = index;
    }

    setPair (symbol, index) {
        this.symbol = symbol;
        this.index = index;
    }

    getSymbol () {
        return this.symbol;
    }

    getIndex () {
        return this.index;
    }
}

class TextChangesHolder 
{
    constructor() 
    {
        this.additions = new Array();
        this.deletions = new Array();
    }

    pushAddition(symbol, index)
    {
        const paire = new Paire(symbol, index);
        this.additions.push(paire);
    }

    pushDeletion(symbol, index)
    {
        const paire = new Paire(symbol, index);
        this.deletions.push(paire);
    }

    pushAdditionArray(str, firstIndex)
    {
        for (let i = 0; i < str.length; i++)
        {
            this.pushAddition(str[i], firstIndex + i);
        }
    }

    pushDeletionArray(str, firstIndex)
    {
        for (let i = 0; i < str.length; i++)
        {
            this.pushDeletion(str[i], firstIndex);
        }
    }

    clearClass()
    {
        this.additions = [];
        this.deletions = [];
    }

    getAdditions() 
    {
        return this.additions;
    }

    getDeletions() 
    {
        return this.deletions;
    }
    
    defineChanges(oldStr, newStr) 
    {
        if (oldStr === newStr)
        {
            return false;
        }
        let strDifference = newStr.length - oldStr.length;
        for (let i = 0; i < (strDifference > 0 ? newStr.length : oldStr.length) ; ++i)
        {
            if ((i < newStr.length) && (i < newStr.length) && (oldStr[i] === newStr[i]))
            {
                continue;
            }
            else
            {
                if (strDifference > 0)
                {
                    this.pushAdditionArray(newStr.substring(i, i + strDifference), i);
                }
                else
                {
                    if (-strDifference == 1)
                    {
                        this.pushDeletion(oldStr.substring(i, i - strDifference), i)
                    }
                    else
                    {
                        this.pushDeletionArray(oldStr.substring(i, i - strDifference), i);
                    }
                }
                return true;
            }
        }
    }
}

export {TextChangesHolder};
export {Paire}