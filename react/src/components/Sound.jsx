import { useEffect, useState } from "react";

export default function Sound({
  isPlaying,
  onSoundClick,
  soundFile,
  setSoundFile,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const onSoundDropdownClick = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !e.target.closest(".sound__menu") &&
        !e.target.closest("#nav-sound")
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showMenu]);

  return (
    <li className="nav__item" id="nav-sound">
      <div>
        <i
          className="nav__icon fa-solid fa-volume-xmark"
          style={{ display: isPlaying ? "none" : "block" }}
          onClick={onSoundClick}
        ></i>
        <i
          className="nav__icon fa-solid fa-volume-high"
          style={{ display: isPlaying ? "block" : "none" }}
          onClick={onSoundClick}
        ></i>
        <i
          className="nav__icon fa-solid fa-angle-down"
          id="sound-dropdown"
          onClick={onSoundDropdownClick}
        ></i>
      </div>
      {showMenu && (
        <ul className="sound__menu">
          <li
            onClick={() => setSoundFile("./assets/sounds/nature.mp3")}
            className={
              soundFile == "./assets/sounds/nature.mp3" ? "active" : ""
            }
          >
            Nature
          </li>
          <hr></hr>
          <li
            onClick={() => setSoundFile("./assets/sounds/lofi.mp3")}
            className={soundFile == "./assets/sounds/lofi.mp3" ? "active" : ""}
          >
            Lofi
          </li>
          <hr></hr>
          <li
            onClick={() => setSoundFile("./assets/sounds/keyboard.mp3")}
            className={
              soundFile == "./assets/sounds/keyboard.mp3" ? "active" : ""
            }
          >
            Keyboard
          </li>
        </ul>
      )}
      {/* <p className="nav__description">Sound</p> */}
    </li>
  );
}
