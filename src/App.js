import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { formatTime } from "./utilities";

const App = () => {
  const [timerInterval, setTimerInterval] = useState(1000);
  const [pomodoro, setPomodoro] = useState({
    isBreak: false,
    loopCounter: 0,
    time: 0,
    timer: false,
  });
  const triggerTimer = () => {
    console.log("triggerTimer", pomodoro);
    setPomodoro({ ...pomodoro, timer: !pomodoro.timer });
  };

  const resetTimer = () => {
    console.log("resetTimer", pomodoro);
    setPomodoro({
      ...pomodoro,
      isBreak: false,
      loopCounter: 0,
      time: 0,
      timer: false,
    });
  };

  const onChangeTimeInterval = (e) => setTimerInterval(+e.target.value);

  const timeout = useRef(null);

  useEffect(() => {
    console.log(pomodoro, timerInterval);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      //logic
      console.log("setTimeout");
      if (pomodoro.timer) {
        if (pomodoro.isBreak) {
          if (pomodoro.loopCounter < 2) {
            if (pomodoro.time < 5000) {
              setPomodoro({ ...pomodoro, time: pomodoro.time + timerInterval });
            } else {
              setPomodoro({
                ...pomodoro,
                isBreak: false,
                loopCounter: pomodoro.loopCounter + 1,
                time: 0,
              });
            }
          } else {
            if (pomodoro.time < 15000) {
              setPomodoro({ ...pomodoro, time: pomodoro.time + timerInterval });
            } else {
              setPomodoro({
                isBreak: false,
                loopCounter: 0,
                time: 0,
                timer: false,
              });
            }
          }
        } else {
          if (pomodoro.time < 25000) {
            setPomodoro({ ...pomodoro, time: pomodoro.time + timerInterval });
          } else {
            setPomodoro({ ...pomodoro, isBreak: true, time: 0 });
          }
        }
      }
      //logic
    }, timerInterval);
  }, [pomodoro, timerInterval]);

  return (
    <div className="app">
      <div className="timer">{formatTime(pomodoro.time)}</div>
      <div>The timer is {pomodoro.timer ? "on" : "off"}</div>
      <div>
        Current timer interval:
        <input
          onChange={onChangeTimeInterval}
          type="number"
          value={timerInterval}
          min={4}
        />
      </div>
      <button onClick={triggerTimer}>
        {pomodoro.timer ? "Pause" : "Start"}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default App;
