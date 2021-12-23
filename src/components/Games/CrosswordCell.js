const CrosswordCell = (props) => {
  return (
    <div className="cell">
      <input
        className={`cellInput ${props.className ? props.className : ''}`}
        type="text"
        size="1"
        maxLength="1"
        disabled={props.disabled}
        data-cellnum={props["data-cellnum"]}
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        autoFocus={props.autoFocus}
      />
    </div>
  );
};

export default CrosswordCell;
