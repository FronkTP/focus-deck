import { useState } from "react";

export default function Link({ toggleLink }) {
  const [links, setLinks] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLinks((prev) => [...prev, { title: titleInput, url: urlInput }]);
    setTitleInput("");
    setUrlInput("");
    console.log(links);
  };

  const handleDelete = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const renderLinks = () => {};

  return (
    <div className="overlay" onClick={toggleLink}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="header modal__bar">
          <p>Links</p>
          <button className="modal__close" onClick={toggleLink}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal__body">
          <form className="link__form" onSubmit={handleSubmit}>
            <div className="link__container-title">
              <label htmlFor="link-input-title">Title</label>
              <input
                id="link-input-title"
                className="link__input"
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="My fav link"
              />
            </div>
            <div className="link__container-url">
              <label htmlFor="link-input-url">Url</label>
              <input
                id="link-input-url"
                className="link__input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="example.com"
              />
            </div>
            <button className="link__add-btn" type="submit">
              Add
            </button>
          </form>
          <hr></hr>
          <ul className="link__list">
            {links.map((link, index) => (
              <li key={index} className="link__item">
                <p className="link__text">
                  <a
                    href={
                      link.url.startsWith("http")
                        ? link.url
                        : `http://${link.url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.title}
                  </a>
                </p>
                <div className="link__item-btns-container">
                  <button
                    className="link__btns link__item-btns link__delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
