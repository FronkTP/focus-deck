import { useState } from "react";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === "") {
      setError("The task can't be empty!");
      return;
    }
    setTasks((prev) => [...prev, { text: input.trim(), completed: false }]);
    setInput("");
    setError("");
  }

  function handleDelete(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function toggleComplete(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <>
      <form className="task__form" onSubmit={handleSubmit}>
        <label htmlFor="task-input" className="task__input-label">
          Add a new task
        </label>
        <div className="task__input-container">
          <input
            id="task-input"
            className="task__input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Read 30 minutes"
          />
          <button className="task__btns task__add-btn" type="submit">
            Add
          </button>
        </div>
        <p className="task__error">{error}</p>
      </form>
      <hr />
      <ul className="task__list">
        {tasks.map((task, index) => (
          <li key={index} className="task__item">
            <p
              className={`task__text ${
                task.completed ? "task__text--strikethrough" : ""
              }`}
              onClick={() => toggleComplete(index)}
            >
              {task.text}
            </p>
            <div className="task__item-btns-container">
              <button
                className="task__btns task__item-btns task__delete-btn"
                onClick={() => handleDelete(index)}
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
