import { useEffect, useState } from "react";
import "./Crossword.css";
import CrosswordCell from "./CrosswordCell";

const Crossword = (props) => {
  const [selectedCell, setSelectedCell] = useState({});
  const [across, setAcross] = useState(true);
  const [cells, setCells] = useState([]);

  const onClickHandler = (event) => {
    if (parseInt(event.target.dataset.cellnum) === selectedCell) {
      setAcross((prevAcross) => {
        return !prevAcross;
      });
    }
    setSelectedCell(parseInt(event.target.dataset.cellnum));
  };

  const onKeyDownHandler = (event) => {
    setSelectedCell(parseInt(event.target.dataset.cellnum) + 1);
    // cell.target.dataset.cellnum
  };

  useEffect(() => {
    const updatedCells = [];
    for (var i = 1; i < 26; i++) {
      //TESTING
      let disabled = "";
      let autoFocus = false;
      if (i === 5) {
        disabled = "disabled";
      }
      if (i === selectedCell) {
        autoFocus = true;
      }
      let className = "";
      const val = across ? 1 : 5;
      if (i === selectedCell + val || i === selectedCell - val) {
        className = "cellHighlight";
      }

      updatedCells.push(
        <CrosswordCell
          className={className}
          disabled={disabled}
          data-cellnum={i}
          key={i}
          onKeyDown={onKeyDownHandler}
          onClick={onClickHandler}
          autoFocus={autoFocus}
        />
      );
    }
    setCells(updatedCells);
  }, [selectedCell, across]);

  return <div className="crossword">{cells}</div>;
};

export default Crossword;
