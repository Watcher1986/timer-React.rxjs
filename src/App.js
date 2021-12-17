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
    interval(100)
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

  return (
    <div className="main">
      <div className="timersBlock">
        <div className="clock">
          <Timer
            hours={('0' + Math.trunc(time / 3600)).slice(-2)}
            minutes={('0' + Math.trunc((time % 3600) / 60)).slice(-2)}
            seconds={('0' + ((time % 3600) % 60)).slice(-2)}
          />
        </div>
        <div className="btnBlock">
          <Button
            onClick={() => {
              if (timerActive) setTime(0);
              setTimerActive(!timerActive);
            }}
            btnName={timerActive ? 'Stop' : 'Start'}
          />
          <Button
            onClick={(event) => {
              setClick((prev) => ({
                ...click,
                cl: event.timeStamp,
                prevCl: prev.cl,
              }));
            }}
            btnName={'Wait'}
          />
          <Button
            onClick={() => {
              setTime(0);
              setTimerActive(true);
            }}
            btnName={'Reset'}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
