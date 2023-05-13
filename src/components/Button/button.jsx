function Button({ onLoadMoreBtnClick }) {
  return (
    <button onClick={onLoadMoreBtnClick} type="button" className="Button">
      Load more
    </button>
  );
}

export default Button;
