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
        <div className="modal__body">hello link</div>
      </div>
    </div>
  );
}
