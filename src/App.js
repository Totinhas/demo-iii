import React, { useState, useEffect } from "react";
import "./App.css";
import { formatTime } from "./utilities";

const App = () => {
  const [timerInterval, setTimerInterval] = useState(5000);
  const [pomodoro, setPomodoro] = useState({
    isBreak: false,
    loopCounter: 0,
    time: 0,
    timer: false,
  });
  const triggerTimer = () => {
    console.log(pomodoro);
    setPomodoro({ ...pomodoro, timer: !pomodoro.timer });
  };

  const onChangeTimeInterval = (e) => setTimerInterval(+e.target.value);

  useEffect(() => {
    console.log(pomodoro, timerInterval);
    setTimeout(() => {
      //logic
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
      <button onClick={triggerTimer}>{pomodoro.timer ? "OFF" : "ON"}</button>
    </div>
  );
};

export default App;
