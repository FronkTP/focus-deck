export default function Header({ onTaskClick, onSoundClick, isPlaying }) {
  return (
    <header>
      <a href="#" className="logo">
        FocusDeck
      </a>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item" id="nav-task" onClick={onTaskClick}>
            <i className="nav__icon fa-solid fa-check"></i>
            <p className="nav__description">Tasks</p>
          </li>
          <li className="nav__item" id="nav-sound" onClick={onSoundClick}>
            <i
              className="nav__icon fa-solid fa-volume-xmark"
              style={{ display: isPlaying ? "none" : "block" }}
            ></i>
            <i
              className="nav__icon fa-solid fa-volume-high"
              style={{ display: isPlaying ? "block" : "none" }}
            ></i>
            <p className="nav__description">Sound</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}
