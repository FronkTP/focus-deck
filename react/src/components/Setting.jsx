import { useContext } from "react";
import { settingContext } from "../App";
import COLOURS from "../COLOURS";

export default function Setting({
  mode,
  onSelectMode,
  toggleMode,
  setBackground,
  toggleSetting,
}) {
  const {
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
  } = useContext(settingContext);

  return (
    <div className="overlay" onClick={toggleSetting}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header modal__bar">
          <p>Setting</p>
          <button className="modal__close" onClick={toggleSetting}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal__body">
          <div className="modal__group">
            <p>Theme</p>
            <ul>
              <li className="setting__item">
                <p className="toggle-label">
                  {/* {mode.charAt(0).toUpperCase() + mode.slice(1)}  */}
                  Mode
                </p>
                <button
                  className="toggle-switch"
                  onClick={toggleMode}
                  aria-label={`Switch to ${
                    mode === "dark" ? "light" : "dark"
                  } mode`}
                >
                  <div
                    className={`toggle-track theme ${
                      mode == "light" ? "left" : "right"
                    }`}
                  >
                    <div className="icon-container sun-container">
                      <svg
                        className="toggle-icon sun-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                      </svg>
                    </div>
                    <div className="icon-container moon-container">
                      <svg
                        className="toggle-icon moon-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />{" "}
                      </svg>
                    </div>

                    {/* Sliding circle */}
                    <div
                      className={`toggle-slider ${
                        mode == "light" ? "left" : "right"
                      }`}
                    ></div>
                  </div>
                </button>
              </li>
            </ul>
            <div className="setting__wallpaper">
              <p className="setting__wallpaper-title">Wallpaper</p>
              <div className="setting__wallpaper-container">
                {/* <div
                  className="setting__wallpaper-item"
                  onClick={() => {
                    onSelectMode(`${mode == "light" ? "dark" : "light"}`);
                    setBackground({
                      type: "color",
                      value: `${
                        mode == "light"
                          ? COLOURS.dark.value
                          : COLOURS.light.value
                      }`,
                    });
                  }}
                >
                  <div
                    style={{
                      background: `${
                        mode == "light"
                          ? COLOURS.dark.value
                          : COLOURS.light.value
                      }`,
                    }}
                    className="setting__wallpaper-color"
                  ></div>
                  <p className="setting__wallpaper-label">
                    {COLOURS.light.title}
                  </p>
                </div> */}
                {Object.entries(COLOURS).map(([key, item]) => {
                  return (
                    <div
                      key={key}
                      className="setting__wallpaper-item"
                      onClick={() => {
                        onSelectMode(
                          item.title === "Default"
                            ? "light"
                            : item.title === "Default Dark"
                            ? "dark"
                            : mode
                        );
                        setBackground({
                          type: item.type,
                          value:
                            item.title === "Default Light"
                              ? COLOURS.light.value
                              : item.title === "Default Dark"
                              ? COLOURS.dark.value
                              : item.value,
                        });
                      }}
                    >
                      {item.type == "color" || item.type == "gradient" ? (
                        <div
                          style={{
                            background: item.value,
                          }}
                          className="setting__wallpaper-color"
                        ></div>
                      ) : (
                        <img
                          src={item.value}
                          className="setting__wallpaper-img"
                        />
                      )}
                      <p className="setting__wallpaper-label">{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="modal__group">
            <p>Widgets</p>
            <ul>
              <li className="setting__item">
                <p className="toggle-label">Task</p>
                <button
                  className="toggle-switch"
                  onClick={() => setShowTask(!showTask)}
                  aria-label={`Toggle ${showTask ? "off" : "on"} task`}
                >
                  <div
                    className={`toggle-track ${!showTask ? "left" : "right"}`}
                  >
                    <div className="icon-container"></div>
                    <div className="icon-container"></div>

                    {/* Sliding circle */}
                    <div
                      className={`toggle-slider ${
                        !showTask ? "left" : "right"
                      }`}
                    ></div>
                  </div>
                </button>
              </li>
              <li className="setting__item">
                <p className="toggle-label">Sound</p>
                <button
                  className="toggle-switch"
                  onClick={() => setShowSound(!showSound)}
                  aria-label={`Toggle ${showSound ? "off" : "on"} sound`}
                >
                  <div
                    className={`toggle-track ${!showSound ? "left" : "right"}`}
                  >
                    <div className="icon-container"></div>
                    <div className="icon-container"></div>

                    {/* Sliding circle */}
                    <div
                      className={`toggle-slider ${
                        !showSound ? "left" : "right"
                      }`}
                    ></div>
                  </div>
                </button>
              </li>
              <li className="setting__item">
                <p className="toggle-label">Link</p>
                <button
                  className="toggle-switch"
                  onClick={() => setShowLink(!showLink)}
                  aria-label={`Toggle ${showLink ? "off" : "on"} link`}
                >
                  <div
                    className={`toggle-track ${!showLink ? "left" : "right"}`}
                  >
                    <div className="icon-container"></div>
                    <div className="icon-container"></div>

                    {/* Sliding circle */}
                    <div
                      className={`toggle-slider ${
                        !showLink ? "left" : "right"
                      }`}
                    ></div>
                  </div>
                </button>
              </li>
              <li className="setting__item">
                <p className="toggle-label">Timer</p>
                <button
                  className="toggle-switch"
                  onClick={() => setShowTimer(!showTimer)}
                  aria-label={`Toggle ${showTimer ? "off" : "on"} timer`}
                >
                  <div
                    className={`toggle-track ${!showTimer ? "left" : "right"}`}
                  >
                    <div className="icon-container"></div>
                    <div className="icon-container"></div>

                    {/* Sliding circle */}
                    <div
                      className={`toggle-slider ${
                        !showTimer ? "left" : "right"
                      }`}
                    ></div>
                  </div>
                </button>
              </li>
              <li className="setting__item">
                <p className="toggle-label">Quote</p>
                <button
                  className="toggle-switch"
                  onClick={() => setShowQuote(!showQuote)}
                  aria-label={`Toggle ${showQuote ? "off" : "on"} quote`}
                >
                  <div
                    className={`toggle-track ${!showQuote ? "left" : "right"}`}
                  >
                    <div className="icon-container"></div>
                    <div className="icon-container"></div>

                    {/* Sliding circle */}
                    <div
                      className={`toggle-slider ${
                        !showQuote ? "left" : "right"
                      }`}
                    ></div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <button
            className="clear_storage-btn"
            onClick={() => {
              localStorage.clear();
              alert("Local storage clear! Refresh the page to see changes.");
            }}
          >
            Clear local storage
          </button>
          <p>
            Some images are designed by{" "}
            <a href="https://www.freepik.com/" className="attribution">
              Freepik
            </a>
          </p>
          <p>
            <a
              href="https://forms.gle/cWaVMw7Y2MfPCc1Z7"
              className="attribution"
            >
              Send feedback to this site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
