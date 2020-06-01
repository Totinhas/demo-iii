import React, { useState, useEffect } from 'react'
import './App.css'
import { formatTime } from './utilities'

const App = () => {
  const [time, setTime] = useState(0)
  const [timer, setTimer] = useState(false)
  const [timerInterval, setTimerInterval] = useState(50)
  const triggerTimer = () => setTimer(!timer)
  const onChangeTimeInterval = (e) => setTimerInterval(+e.target.value)

  useEffect(() => {
    setTimeout(() => timer && setTime(time + timerInterval), timerInterval)
  }, [time, timer, timerInterval])

  return (
    <div className='app'>
      <div className='timer'>{formatTime(time)}</div>
      <div>The timer is {timer ? 'on' : 'off'}</div>
      <div>
        Current timer interval:
        <input
          onChange={onChangeTimeInterval}
          type='number'
          value={timerInterval}
          min={4}
        />
      </div>
      <button onClick={triggerTimer}>{timer ? 'OFF' : 'ON'}</button>
    </div>
  )
}

export default App
