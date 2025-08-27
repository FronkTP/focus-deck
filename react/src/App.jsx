import { useState, useEffect, useRef, createContext } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import Link from "./components/Link";
import Setting from "./components/Setting";
import Timer from "./components/Timer";
import Quote from "./components/Quote";
import "./style.css";

// Context
const settingContext = createContext();
export { settingContext };

export default function App() {
  // Settings
  const [showTask, setShowTask] = useState(true);
  const [showSound, setShowSound] = useState(true);
  const [showLink, setShowLink] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  const [showQuote, setShowQuote] = useState(true);

  // Ui
  const [mode, setMode] = useState("light");
  const [isMobile, setIsMobile] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isSettingOpen, setSettingOpen] = useState(false);

  // Sound states
  const soundRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 700px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getTaskClasses = () => {
    let classes = "task";
    if (isTaskOpen) {
      if (isMobile) {
        classes += " task--modal-active";
      } else {
        classes += " task--side-active";
      }
    }
    return classes;
  };

  const shouldShift = isTaskOpen && !isMobile;

  // Theme
  const onSelectMode = (mode) => {
    setMode(mode);
    if (mode === "dark") document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  };

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) =>
        onSelectMode(e.matches ? "dark" : "light")
      );

    // Setup dark/light mode for the first time
    onSelectMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  // Task
  const toggleTask = () => {
    setIsTaskOpen((prev) => !prev);
  };
  const closeTask = () => setIsTaskOpen(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !e.target.closest(".task") &&
        !e.target.closest("#nav-task") &&
        !e.target.closest(".task__btns")
      ) {
        closeTask();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Sound
  useEffect(() => {
    soundRef.current = new Audio("./assets/sounds/nature.mp3");
    soundRef.current.loop = true;
    return () => soundRef.current.pause();
  }, []);

  const toggleSound = () => {
    if (!soundRef.current) return;
    if (playing) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setPlaying((prev) => !prev);
  };

  const playSound = () => {
    soundRef.current.play();
    setPlaying(true);
  };

  const pauseSound = () => {
    soundRef.current.pause();
    setPlaying(false);
  };

  // Setting
  const toggleSetting = () => {
    setSettingOpen((isSettingOpen) => !isSettingOpen);
  };

  useEffect(() => {
    if (isSettingOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isSettingOpen]);

  return (
    <settingContext.Provider
      value={{
        showTask,
        setShowTask,
        showSound,
        setShowSound,
        showLink,
        setShowLink,
        showTimer,
        setShowTimer,
        showQuote,
        setShowQuote,
      }}
    >
      <div className="container">
        <Header
          onTaskClick={toggleTask}
          onSoundClick={toggleSound}
          onSettingClick={toggleSetting}
          isPlaying={playing}
        />
        <main>
          {showTask && (
            <div className={getTaskClasses()}>
              <Task />
            </div>
          )}
          <div className="display">
            {showTimer && (
              <div className={`timer ${shouldShift ? "shift-left" : ""}`}>
                <Timer playSound={playSound} pauseSound={pauseSound} />
              </div>
            )}
            {showQuote && (
              <div className={`quote ${shouldShift ? "shift-left" : ""}`}>
                <Quote />
              </div>
            )}
          </div>
        </main>
        <footer>
          <div>
            <p>&copy; {new Date().getFullYear()} Fronk. All Rights Reserved</p>
          </div>
        </footer>
      </div>
      {isSettingOpen && (
        <Setting
          mode={mode}
          onSelectMode={onSelectMode}
          toggleSetting={toggleSetting}
        />
      )}
    </settingContext.Provider>
  );
}
