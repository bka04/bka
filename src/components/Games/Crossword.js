import { useState } from "react";
import "./Crossword.css";
import CrosswordCell from "./CrosswordCell";

const Crossword = (props) => {
  const [selectedCell, setSelectedCell] = useState({});
  const [across, setAcross] = useState(true);

  const onClickHandler = () => {
    setAcross((prevAcross) => {
      console.log(!prevAcross);
      return !prevAcross;
    })
  }

  const cells = [];
  for (var i = 0; i < 25; i++) {
    let disabled = "";
    if (i === 4) { //testing - will be passed in data object
      disabled="disabled";
    }
    cells.push(<CrosswordCell disabled={disabled} data-cellnum={i+1} key={i} onClick={onClickHandler} />);
  }


  return (
    <div className="crossword">
      {cells}
    </div>
  );
};

export default Crossword;
