export default function Link({ toggleLink }) {
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
          <div className="link__form">
            <div className="link__container-title">
              <label for="link-input-title">Title</label>
              <input
                id="link-input-title"
                className="link__input"
                type="text"
                placeholder="Greatest link"
              />
            </div>
            <div className="link__container-url">
              <label for="link-input-url">Url</label>
              <input
                id="link-input-url"
                className="link__input"
                type="text"
                placeholder="example.com"
              />
            </div>
            <button className="link__add-btn" type="submit">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
