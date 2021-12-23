import {useState, useEffect} from 'react';
import CrosswordGrid from "./CrosswordGrid";


const DUMMYDATA = [];

for (var i = 1; i < 26; i++) {
  //TESTING
  let disabled = "";
  if (i === 5) {
    disabled = "disabled";
  }

  let focus=false;
  // if (i===12) {
  //   focus = true;
  // }

  DUMMYDATA.push({
    id: i,
    disabled,
    focus,
    value: ''
  })
}

const Crossword = (props) => {
  const [cellData, setCellData] = useState(DUMMYDATA);
  const [selectedCell, setSelectedCell] = useState(1);
  const [across, setAcross] = useState(true);


  const onKeyDownHandler = (event) => {
    const index = parseInt(event.target.dataset.cellnum);
    setCellData((prevCellData) => {
      prevCellData[index - 1].value = event.key;
      const newCellData = prevCellData.map((cell) => ({ ...cell, focus: false }))
      newCellData[index].focus = true;
      return newCellData;
    })
    

    if (event.key === 'click') {
      if (parseInt(event.target.dataset.cellnum) === selectedCell) {
        setAcross((prevAcross) => {
          return !prevAcross;
        });
      }
      setSelectedCell(parseInt(event.target.dataset.cellnum));
    } else if (event.key === 'letter') {
      //update cellData with user input
      setSelectedCell(parseInt(event.target.dataset.cellnum) + 1);
    }
    // cell.target.dataset.cellnum
  };

  // const updateCellData

  return (
    <CrosswordGrid
      cellData={cellData}
      // selectedCell={selectedCell}
      onKeyDown={onKeyDownHandler}
    />
    
  );
};

export default Crossword;
