import {useRef, useEffect} from 'react';

const CrosswordCell = (props) => {
  const cellInput = useRef(null);
  
  useEffect( () => {
    if (props.focus) {
      cellInput.current.focus();
    }
  })

  return (
    <div className="cell">
      <input
        className={`cellInput ${props.className ? props.className : ''}`}
        type="text"
        size="1"
        maxLength="1"
        defaultValue={props.cellValue}
        disabled={props.disabled}
        data-cellnum={props["data-cellnum"]}
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        ref={cellInput}
      />
    </div>
  );
};

export default CrosswordCell;
