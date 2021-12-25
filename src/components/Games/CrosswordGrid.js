import "./CrosswordGrid.css";
import CrosswordCell from "./CrosswordCell";

const CrosswordGrid = (props) => {

  return (
  <div className="crossword">
    {props.cellData.map((cell) => (
    <CrosswordCell 
      disabled={cell.disabled ? 'disabled' : ''}
      highlight={cell.highlight}
      data-cellnum={cell.id}
      key={cell.id}
      focus={cell.focus}
      cellValue={cell.value}
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onMouseDown}
    />
    ))}
    
    </div>);
};

export default CrosswordGrid;
