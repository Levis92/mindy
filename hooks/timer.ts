import {useEffect, useReducer} from 'react';

interface UseTimerState {
  totalTime: number;
  timeLeft: number;
  running: boolean;
  willResetTimer: boolean;
}

interface TimerState {
  running: boolean;
  totalTime: number;
  secondsLeft: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerFunctions {
  setTimer(seconds: number): void;
  toggleTimer(): void;
  resetTimer(): void;
}

const TIME_RESOLUTION = 1000;
const TIME_STEP = TIME_RESOLUTION / 10;

function timerReducer(
  prevState: UseTimerState,
  newState: Partial<UseTimerState>,
): UseTimerState {
  return {...prevState, ...newState};
}

function calculateTimeLeft(timeLeft: number) {
  const secondsLeft = Math.ceil(timeLeft / TIME_RESOLUTION);
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  return {hours, minutes, seconds, secondsLeft};
}

export function useTimer(
  initialTime: number,
  countDown = true,
): [TimerState, TimerFunctions] {
  const [state, setState] = useReducer(timerReducer, {
    totalTime: initialTime * TIME_RESOLUTION,
    timeLeft: initialTime * TIME_RESOLUTION,
    running: false,
    willResetTimer: false,
  });
  const {running, totalTime, timeLeft, willResetTimer} = state;

  const setTimer = (seconds: number) =>
    !running &&
    setState({
      timeLeft: seconds * TIME_RESOLUTION,
      totalTime: seconds * TIME_RESOLUTION,
    });

  const toggleTimer = () => setState({running: !running});

  const resetTimer = () => setState({willResetTimer: true});

  useEffect(() => {
    const calculateNewTime = () => timeLeft + TIME_STEP * (countDown ? -1 : 1);
    setTimeout(() => {
      if (willResetTimer) {
        setState({
          timeLeft: totalTime,
          willResetTimer: false,
        });
      } else if (running && timeLeft > 0) {
        const newTime = calculateNewTime();
        if (newTime === 0) {
          setState({timeLeft: newTime, running: false});
        } else {
          setState({timeLeft: newTime});
        }
      }
    }, TIME_STEP);
  }, [running, totalTime, timeLeft, countDown, willResetTimer, initialTime]);

  return [
    {
      running,
      totalTime: totalTime / TIME_RESOLUTION,
      ...calculateTimeLeft(timeLeft),
    },
    {setTimer, toggleTimer, resetTimer},
  ];
}
