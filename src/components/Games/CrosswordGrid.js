import "./CrosswordGrid.css";
import CrosswordCell from "./CrosswordCell";

const CrosswordGrid = (props) => {

  console.log('rendered grid'); 

  return (
  <div className="crossword">
    {props.cellData.map((cell) => (
    <CrosswordCell 
      disabled={cell.disabled}
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
