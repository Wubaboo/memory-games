import { useState, useEffect} from "react";

export default function NumberCell (props) {
    const {value, reset, handleReset, nextValue, setNextValue, playing, setPlaying, win, setWin, difficulty} = props;
    const [classes, setClasses] = useState(['grid-cell', 'hidden'])

    useEffect(() => {
        let classes = ['grid-cell']
        if (win) {
            classes.push('win-cell')
        }
        else if (win === false) {
            classes.push('wrong-cell')
        }
        else if ((reset && value === 0) || (playing && (value >= nextValue)) ) 
            classes.push('hidden')
        if (value !== 0) 
            classes.push('value-cell')
        setClasses(classes)
    }, [reset, playing, win, value])

    function handleClick () {
        console.log(classes, nextValue, win, difficulty)
        if (classes.includes('hidden')) {
            setClasses(['grid-cell'])
            setPlaying(true);
        }
        if (value != nextValue) {
            setClasses(['grid-cell', 'wrong-cell'])
            setPlaying(false)
            setWin(false)
        }
        else if (value === difficulty) {
            setWin(true)
            setPlaying(false)
        }
        
        else {
            setNextValue(nextValue + 1)
            setPlaying(true);
        }
    }

    return (<div className={classes.join(' ')} onClick={handleClick}>{value ? value : null}</div>)

}