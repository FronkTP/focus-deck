import { useContext } from "react";
import { settingContext } from "../App";

export default function Setting({ toggleSetting }) {
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
    <div className="modal">
      <div className="header">
        <h1>Setting:</h1>
        <button className="modal__close" onClick={toggleSetting}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div>
        <p>
          {JSON.stringify({
            showTask,
            showSound,
            showLink,
            showTimer,
            showQuote,
          })}
        </p>
        <ul>
          <li>
            <button onClick={() => setShowTask(!showTask)}>toggle Task</button>
          </li>
          <li>
            <button onClick={() => setShowSound(!showSound)}>
              toggle Sound
            </button>
          </li>
          <li>
            <button onClick={() => setShowLink(!showLink)}>toggle Link</button>
          </li>
          <li>
            <button onClick={() => setShowTimer(!showTimer)}>
              toggle Timer
            </button>
          </li>
          <li>
            <button onClick={() => setShowQuote(!showQuote)}>
              toggle Quote
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
