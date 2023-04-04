import { useEffect, useState } from "react";

export default function Timer({paused, active, visible}) {
    const [time, setTime] = useState(0);
    useEffect(()=> {
        let interval = null;
        if (active && !paused) {
            interval = setInterval(() => {
                setTime(prev => prev + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => {clearInterval(interval)}
    })
    function formatTime(ms) {
        return new Date(time).toISOString().slice(14, -1)

    }
    return (
        <div className="timer">
        {visible ? formatTime(time) : null}
        </div>
    )
}
