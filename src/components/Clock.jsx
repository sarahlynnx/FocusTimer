import React, { useEffect, useState } from "react";

const Clock = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [play, setPlay] = useState(false);
    const [timerType, setTimerType] = useState('SESSION');
    const [timeLeft, setTimeLeft] = useState(1500);


    const timeout = setTimeout(() => {
        if (timeLeft && play) {
            setTimeLeft(timeLeft -1)
        }
    }, 1000);

    const handleBreakDecrement = () => {
        if (breakLength > 1) {
            setBreakLength(breakLength - 1);
        }
    };

    const handleBreakIncrement = () => {
        if (breakLength < 60) {
            setBreakLength(breakLength + 1)
        }
    }

      const handleSessionDecrement = () => {
        if (sessionLength > 1) {
          setSessionLength(sessionLength - 1);
          setTimeLeft(timeLeft - 60);
        }
      };

      const handleSessionIncrement = () => {
        if (sessionLength < 60) {
          setSessionLength(sessionLength + 1);
          setTimeLeft(timeLeft + 60)
        }
      };

      const formattedTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft - minutes * 60;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedMinutes}:${formattedSeconds}`;
      }

      const handlePlay = () => {
        clearTimeout(timeout);
            setPlay(!play);
      }

      const resetTimer = () => {
        const audio =document.getElementById('beep');
        if (!timeLeft && timerType === 'session') {
            setTimeLeft(breakLength * 60)
            setTimerType('break')
            audio.play()
        }
        if (!timeLeft && timerType === 'break') {
            setTimeLeft(sessionLength * 60)
            setTimerType('session')
            audio.pause()
            audio.currentTime = 0;
        }
      }

      const clock = () => {
        if (play) {
            resetTimer()
        } else {
            clearTimeout(timeout)
        }
      }

      const handleReset = () => {
        clearTimeout(timeout);
        setPlay(false);
        setTimeLeft(1500);
        setBreakLength(5);
        setSessionLength(25);
        setTimerType('session');
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;
      }

      useEffect(() => {
        clock()
      }, [play, timeLeft, timeout])

      const display = timerType === 'session' ? 'Session' : 'Break';

    return(
        <>
            <div className="wrapper">
                <h2 className="title">25 + 5 Clock</h2>
                <div className="break-session-length">
                    <div>
                        <h2 id='break-label'>Break Length</h2>
                        <div>
                            <button disabled={play} id='break-decrement' onClick={handleBreakDecrement}>Decrease</button>
                                <strong className="numbers" id='break-length'>{breakLength}</strong>
                            <button disabled={play} id='break-increment' onClick={handleBreakIncrement}>Increase</button>
                        </div>
                    </div>
                    <div>
                        <h2 id='session-label'>Session Length</h2>
                        <div>
                            <button disabled={play} id='session-decrement' onClick={handleSessionDecrement}>Decrease</button>
                                <strong className='numbers' id='session-length'>{sessionLength}</strong>
                            <button disabled={play} id='session-increment' onClick={handleSessionIncrement}>Increase</button>
                        </div>
                    </div>
                </div>
                <div className="timer-wrapper">
                    <div className="timer"> 
                        <h3 id='timer-label'>{display}</h3>
                        <h1 id='time-left'>{formattedTime()}</h1>
                    </div>
                    <button onClick={handlePlay} id="start_stop">Pause/Play</button>
                    <button onClick={handleReset} id='reset'>Reset</button>
                </div>
            </div>
            <audio
                preload="auto"
                id="beep"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </>
    );
}

export default Clock;