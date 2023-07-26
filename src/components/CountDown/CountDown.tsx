import React, { useState, useEffect } from 'react';

interface CountdownTimerI {
  minutes: number,
  isTimeFinished: (time: boolean) => void
  isGameFinished: boolean
}
function CountdownTimer({ minutes, isTimeFinished, isGameFinished }: CountdownTimerI) {

  const [minutesRemaining, setMinutesRemaining] = useState(Math.floor(minutes));
  const [secondsRemaining, setSecondsRemaining] = useState(Math.floor(minutes / 60));

  const timeDisplay = `${minutesRemaining}:${secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}`
  useEffect(() => {
    setMinutesRemaining(Math.floor(minutes))
    setSecondsRemaining(Math.floor(minutes / 60))
  }, [minutes])
  useEffect(() => {
   if(isGameFinished){
    alert(`Congrats!!! You finished game in ${minutesRemaining} minutes and ${secondsRemaining} seconds`)
   }
  }, [ isGameFinished])


  useEffect(() => {
    if(isGameFinished){return}
    const intervalId = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(seconds => seconds - 1);
      }
      if (secondsRemaining === 0) {
        if (minutesRemaining === 0) {
          isTimeFinished(true)
          clearInterval(intervalId)

        } else {
            setMinutesRemaining(minutes => minutes - 1);
            setSecondsRemaining(59);
          
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [minutesRemaining, secondsRemaining]);

  return (
    <div>
      {timeDisplay}
    </div>
  );
}
export default CountdownTimer
