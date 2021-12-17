import { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Button from './components/Button';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [click, setClick] = useState({
    cl: 0,
    prevCl: 0,
  });

  useEffect(() => {
    const timer$ = new Subject();
    interval(1000)
      .pipe(takeUntil(timer$))
      .subscribe(() => {
        if (timerActive) {
          setTime((prevTime) => prevTime + 1);
        }
      });

    return () => {
      timer$.next();
      timer$.complete();
    };
  }, [timerActive]);

  useEffect(() => {
    if (click.cl - click.prevCl < 300) {
      setTimerActive(false);
    }
  }, [click]);

  const onStartStopClick = () => {
    if (timerActive) setTime(0);
    setTimerActive(!timerActive);
  };

  const onWaitClick = (event) => {
    setClick((prev) => ({
      ...click,
      cl: event.timeStamp,
      prevCl: prev.cl,
    }));
  };

  const onReset = () => {
    setTime(0);
    setTimerActive(true);
  };

  return (
    <div className="container">
      <div className="container_timer">
        <div className="container_timer-clock">
          <Timer
            hours={('0' + Math.trunc(time / 3600)).slice(-2)}
            minutes={('0' + Math.trunc((time % 3600) / 60)).slice(-2)}
            seconds={('0' + ((time % 3600) % 60)).slice(-2)}
          />
        </div>
        <div className="container_timer-buttons">
          <Button
            onClick={onStartStopClick}
            btnName={timerActive ? 'Stop' : 'Start'}
          />
          <Button onClick={onWaitClick} btnName={'Wait'} />
          <Button onClick={onReset} btnName={'Reset'} />
        </div>
      </div>
    </div>
  );
}

export default App;
