import React, { useState, useEffect } from "react";
import "./App.css";
import { formatTime } from "./utilities";

const App = () => {
  const [timer, setTimer] = useState(false);
  const [timerInterval, setTimerInterval] = useState(1000);
  const [pomodoro, setPomodoro] = useState({
    isBreak: false,
    loopCounter: 0,
    time: 0,
  });
  const triggerTimer = () => setTimer(!timer);
  const onChangeTimeInterval = (e) => setTimerInterval(+e.target.value);

  useEffect(() => {
    console.log(pomodoro.time, timer, timerInterval, pomodoro);
    setTimeout(() => {
      if (timer) {
        if (pomodoro.time < 25000) {
          setPomodoro({ ...pomodoro, time: pomodoro.time + timerInterval });
        } else {
          setPomodoro({
            isBreak: true,
            loopCounter: pomodoro.loopCounter + 1,
            time: 0,
          });
        }
      }
    }, timerInterval);
  }, [pomodoro.time, timer, timerInterval, pomodoro]);

  return (
    <div className="app">
      <div className="timer">{formatTime(pomodoro.time)}</div>
      <div>The timer is {timer ? "on" : "off"}</div>
      <div>
        Current timer interval:
        <input
          onChange={onChangeTimeInterval}
          type="number"
          value={timerInterval}
          min={4}
        />
      </div>
      <button onClick={triggerTimer}>{timer ? "OFF" : "ON"}</button>
    </div>
  );
};

export default App;
