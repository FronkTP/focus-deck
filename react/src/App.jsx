import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import Timer from "./components/Timer";
import Quote from "./components/Quote";
import "./style.css";

export default function App() {
  const [mode, setMode] = useState("light");

  const onSelectMode = (mode) => {
    setMode(mode);
    if (mode === "dark") document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  };

  useEffect(() => {
    // Add listener to update styles
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

    // Remove listener
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isTaskVisible, setIsTaskVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 700px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("./assets/sounds/nature.mp3");
    audioRef.current.loop = true;
    return () => audioRef.current.pause();
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying((prev) => !prev);
  };

  function playSound() {
    audioRef.current.play();
    setPlaying(true);
  }

  function pauseSound() {
    audioRef.current.pause();
    setPlaying(false);
  }

  const toggleTask = (e) => {
    setIsTaskVisible((prev) => !prev);
  };
  const closeTask = () => setIsTaskVisible(false);

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

  // Determine task classes based on screen size and visibility
  const getTaskClasses = () => {
    let classes = "task";
    if (isTaskVisible) {
      if (isMobile) {
        classes += " task--modal-active";
      } else {
        classes += " task--side-active";
      }
    }
    return classes;
  };

  // Determine if timer and quote should shift (only on desktop when task is visible)
  const shouldShift = isTaskVisible && !isMobile;

  return (
    <div className="container">
      <Header
        onTaskClick={toggleTask}
        onSoundClick={toggleSound}
        isPlaying={playing}
        mode={mode}
        onSelectMode={onSelectMode}
      />
      <main>
        <div className={getTaskClasses()}>
          <Task />
        </div>
        <div className="display">
          <div className={`timer ${shouldShift ? "shift-left" : ""}`}>
            <Timer playSound={playSound} pauseSound={pauseSound} />
          </div>
          <div className={`quote ${shouldShift ? "shift-left" : ""}`}>
            <Quote />
          </div>
        </div>
      </main>
      <footer>
        <div>
          <p>&copy; {new Date().getFullYear()} Fronk. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
