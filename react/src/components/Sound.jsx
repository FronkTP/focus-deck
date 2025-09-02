import { useState } from "react";

export default function Sound({ isPlaying, onSoundClick, setSoundFile }) {
  const [showMenu, setShowMenu] = useState(false);

  const onSoundDropdownClick = () => {
    setShowMenu((prev) => !prev);
  };

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
        <ul className="sound-menu">
          <li onClick={() => setSoundFile("./assets/sounds/nature.mp3")}>
            Nature
          </li>
          <li onClick={() => setSoundFile("./assets/sounds/lofi.mp3")}>Lofi</li>
          <li onClick={() => setSoundFile("./assets/sounds/keyboard.mp3")}>
            Keyboard
          </li>
        </ul>
      )}
      {/* <p className="nav__description">Sound</p> */}
    </li>
  );
}
