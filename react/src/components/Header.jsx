import { useContext } from "react";
import { settingContext } from "../App";
import Sound from "./Sound";

export default function Header({
  onTaskClick,
  onSoundClick,
  setSoundFile,
  onLinkClick,
  onSettingClick,
  isPlaying,
}) {
  const { showTask, showSound, showLink } = useContext(settingContext);

  return (
    <header className="header">
      <a href="#" className="logo">
        FocusDeck
      </a>
      <nav className="nav">
        <ul className="nav__list">
          {showTask && (
            <li
              className="nav__item flex-center"
              id="nav-task"
              onClick={onTaskClick}
            >
              <i className="nav__icon fa-solid fa-check"></i>
              {/* <p className="nav__description">Tasks</p> */}
            </li>
          )}
          {showSound && (
            <Sound
              isPlaying={isPlaying}
              onSoundClick={onSoundClick}
              setSoundFile={setSoundFile}
            />
          )}
          {showLink && (
            <li className="nav__item" id="nav-link" onClick={onLinkClick}>
              <i className="nav__icon fa-solid fa-link"></i>
              {/* <p className="nav__description">Links</p> */}
            </li>
          )}
          <li className="nav__item" id="nav-link" onClick={onSettingClick}>
            <i className="nav__icon fa-solid fa-gears"></i>
            {/* <p className="nav__description">Setting</p> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}
