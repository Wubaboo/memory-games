import { useState, useEffect} from "react";

export default function NumberCell (props) {
    const {value, reset, allHidden} = props;
    const [classes, setClasses] = useState(['grid-cell', 'hidden'])

    useEffect(() => {
        let classes = ['grid-cell']
        if (allHidden || (reset && value === 0)) 
            classes.push('hidden')
        if (value !== 0 && !classes.includes('hidden')) 
            classes.push('value-cell')
        setClasses(classes)
    }, [reset])
    function handleClick () {
        setClasses(['grid-cell'])
    }

    return (<div className={classes.join(' ')} onClick={classes.includes('hidden') ? handleClick : null}>{value}</div>)

}