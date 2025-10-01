import { useState, useEffect, useRef, createContext } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import Link from "./components/Link";
import Setting from "./components/Setting";
import Timer from "./components/Timer";
import Quote from "./components/Quote";
import "./style.css";
import "./toggle.css";
import COLOURS from "./COLOURS";

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
  const [mode, setMode] = useState("dark");
  const [background, setBackground] = useState({
    type: "image",
    value:
      "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // color or image URL
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isSettingOpen, setSettingOpen] = useState(false);

  // Sound states
  const [soundFile, setSoundFile] = useState("./assets/sounds/nature.mp3");
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const toggleMode = () => {
    onSelectMode(mode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    window;
    mediaQuery.addEventListener("change", (e) =>
      onSelectMode(e.matches ? "dark" : "light")
    );

    // Setup dark/light mode for the first time
    onSelectMode(mediaQuery.matches ? "dark" : "light");

    return () => {
      mediaQuery.removeEventListener("change", () => {});
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
    if (soundRef.current) soundRef.current.pause();
    soundRef.current = new Audio(soundFile);
    soundRef.current.loop = true;
    if (isPlaying) soundRef.current.play();
    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
      }
    };
  }, [soundFile, isPlaying]);

  const toggleSound = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const playSound = () => {
    soundRef.current.play();
    setIsPlaying(true);
  };

  const pauseSound = () => {
    soundRef.current.pause();
    setIsPlaying(false);
  };

  // Link

  const toggleLink = () => {
    setIsLinkOpen((isLinkOpen) => !isLinkOpen);
  };

  // Setting
  const toggleSetting = () => {
    setSettingOpen((isSettingOpen) => !isSettingOpen);
  };

  useEffect(() => {
    if (isSettingOpen || isLinkOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isSettingOpen, isLinkOpen]);

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
      <div
        className={`container ${
          background.type == "color" ? "" : "image-background"
        }`}
        style={
          background.type == "color"
            ? COLOURS[background.value].type === "gradient"
              ? { backgroundImage: COLOURS[background.value].value }
              : { backgroundColor: COLOURS[background.value].value }
            : { backgroundImage: `url(${background.value})` }
        }
      >
        <Header
          onTaskClick={toggleTask}
          onSoundClick={toggleSound}
          setSoundFile={setSoundFile}
          onLinkClick={toggleLink}
          onSettingClick={toggleSetting}
          isPlaying={isPlaying}
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
      {isLinkOpen && <Link toggleLink={toggleLink} />}
      {isSettingOpen && (
        <Setting
          mode={mode}
          onSelectMode={onSelectMode}
          toggleMode={toggleMode}
          setBackground={setBackground}
          toggleSetting={toggleSetting}
        />
      )}
    </settingContext.Provider>
  );
}
