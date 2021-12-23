const CrosswordCell = (props) => {
  return (
    <div className="cell">
      <input
        className="cellInput"
        type="text"
        size="1"
        maxLength="1"
        disabled={props.disabled}
        data-cellnum={props["data-cellnum"]}
        onClick={props.onClick}
      />
    </div>
  );
};

export default CrosswordCell;
