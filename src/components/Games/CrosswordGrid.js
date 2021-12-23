import "./CrosswordGrid.css";
import CrosswordCell from "./CrosswordCell";

const CrosswordGrid = (props) => {

  console.log('rendered grid'); 

  return (
  <div className="crossword">
    {props.cellData.map((cell) => (
    <CrosswordCell 
      className={cell.className}
      disabled={cell.disabled}
      data-cellnum={cell.id}
      key={cell.id}
      focus={cell.focus}
      cellValue={cell.value}
      onKeyDown={props.onKeyDown}
      // onClick={props.onClick}
    />
    ))}
    
    </div>);
};

export default CrosswordGrid;
