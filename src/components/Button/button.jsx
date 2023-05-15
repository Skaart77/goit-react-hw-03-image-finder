function Button({ onLoadMoreBtnClick }) {
  return (
    <button
      onLoadMoreBtnClick={onLoadMoreBtnClick}
      type="button"
      className="Button"
    >
      Load more
    </button>
  );
}

export default Button;
