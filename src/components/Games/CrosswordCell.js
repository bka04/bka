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
      //{`${cell.className} ${cell.highlight ? 'cellHighlight' : ''}`}
        className={`cellInput ${props.className ? props.className : ''}` 
          + `${props.highlight ? ' cellHighlight' : ''}`}
        type="text"
        size="1"
        maxLength="1"
        value={props.cellValue}
        disabled={props.disabled}
        data-cellnum={props["data-cellnum"]}
        onKeyDown={props.onKeyDown}
        onMouseDown={props.onMouseDown}
        ref={cellInput}
        readOnly
      />
    </div>
  );
};

export default CrosswordCell;
