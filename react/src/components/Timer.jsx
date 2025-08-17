import { useEffect, useState } from "react";

const modes = {
  pomodoroTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
};

export default function Timer({ playSound, pauseSound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(modes.pomodoroTime);
  const [mode, setMode] = useState("pomodoroTime");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (currentTime === 0) {
      pauseSound();
      setIsPlaying(false);
      clearInterval(intervalId);
      setIntervalId(null);

      // Play end sound
      const endSound = new Audio("./assets/sounds/time-up.mp3");
      let playCount = 1;
      endSound.play();
      endSound.addEventListener("ended", () => {
        if (playCount < 3) {
          playCount++;
          endSound.currentTime = 0;
          endSound.play();
        }
      });
    }
  }, [currentTime]);

  const displayTime = () => {
    const min = Math.floor(currentTime / 60);
    const sec = String(currentTime % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const start = () => {
    setIsPlaying(true);
    playSound();
    if (intervalId) return;
    const id = setInterval(() => {
      setCurrentTime((prev) => prev - 1);
    }, 1000);
    setIntervalId(id);
  };

  const pause = () => {
    pauseSound();
    setIsPlaying(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const reset = () => {
    pause();
    setCurrentTime(modes[mode]);
  };

  const setTimerMode = (newMode) => {
    pause();
    setMode(newMode);
    setCurrentTime(modes[newMode]);
  };

  return (
    <div className="timer">
      <div className="timer__mode-btns">
        <button
          className={`timer__mode-btn ${
            mode === "pomodoroTime" ? "active" : ""
          }`}
          onClick={() => setTimerMode("pomodoroTime")}
        >
          Pomodoro
        </button>
        <button
          className={`timer__mode-btn ${
            mode === "shortBreakTime" ? "active" : ""
          }`}
          onClick={() => setTimerMode("shortBreakTime")}
        >
          Short Break
        </button>
        <button
          className={`timer__mode-btn ${
            mode === "longBreakTime" ? "active" : ""
          }`}
          onClick={() => setTimerMode("longBreakTime")}
        >
          Long Break
        </button>
      </div>
      <p className="timer__display">{displayTime()}</p>
      <div className="timer__control-btns">
        {!isPlaying ? (
          <button className="timer__control-btn" onClick={start}>
            <i className="fa-solid fa-play"></i>
          </button>
        ) : (
          <button className="timer__control-btn" onClick={pause}>
            <i className="fa-solid fa-pause"></i>
          </button>
        )}
        <button className="timer__control-btn" onClick={reset}>
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>
    </div>
  );
}
