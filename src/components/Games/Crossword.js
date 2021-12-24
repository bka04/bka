import { useState } from "react";
import CrosswordGrid from "./CrosswordGrid";

const DUMMYDATA = [];

for (var i = 1; i < 26; i++) {
  //TESTING
  let disabled = "";
  if (i === 8) {
    disabled = "disabled";
  }

  let focus = false;
  // if (i===12) {
  //   focus = true;
  // }

  DUMMYDATA.push({
    id: i,
    disabled,
    focus,
    value: "",
  });
}

const Crossword = (props) => {
  const [cellData, setCellData] = useState(DUMMYDATA);
  const [selectedCell, setSelectedCell] = useState(0);
  const [across, setAcross] = useState(true);

  console.log('rendered Crossword');

  const onKeyDownHandler = (event) => {
    const cellNum = parseInt(event.target.dataset.cellnum);
    let index = cellNum - 1;

    //NEED TO ADD CHECK FOR LETTER!
    setCellData((prevCellData) => {
      prevCellData[index].value = event.key;
      const newCellData = prevCellData.map((cell) => ({
        ...cell,
        focus: false, //set all other cells' focus to false
      }));
      //NEED TO ADD DOWN!! AND REFACTOR THIS
      if (across) {
        index++;
        if (index === 25) {
          index = 0;
        }
        while (index < 25) {
          if (newCellData[index].disabled === '') {
            break;
          }
          index++;
          if (index === 24) {
            index = 0;
          }
        }
        newCellData[index].focus = true;
        setSelectedCell(index + 1);
        return newCellData;
      }
      
    });
  };

  const onMouseDownHandler = (event) => {
    const cellNum = parseInt(event.target.dataset.cellnum);
    let index = cellNum - 1;

    if (cellNum === selectedCell) {
      setAcross((prevAcross) => {
        return !prevAcross;
      });
    }
    setSelectedCell(cellNum);

    //Highlight cells in same word (either across or down)
    setCellData((prevCellData) => {
      const newCellData = prevCellData.map((cell) => ({
        ...cell,
        highlight: false, //set all other cells' highlight to false
      }));

      if (across) {
        //highlight letters in same word (across)
        //first, check to the right
        index++;
        while (index % 5 > 0) {
          if (newCellData[index].disabled) {
            break;
          }
          newCellData[index].highlight = true;
          index++;
        }
        //second, check to the left
        let index2 = cellNum - 1;
        index2--;
        while (index2 % 5 !== 4 && index2 >= 0) {
          if (newCellData[index2].disabled) {
            break;
          }
          newCellData[index2].highlight = true;
          index2--;
        }
      } else {
        //first, check below
        index += 5;
        while (index < 25) {
          if (newCellData[index].disabled) {
            break;
          }
          newCellData[index].highlight = true;
          index += 5;
        }
        //second, check above
        let index2 = cellNum - 1;
        index2 -= 5;
        while (index2 >= 0) {
          if (newCellData[index2].disabled) {
            break;
          }
          newCellData[index2].highlight = true;
          index2 -= 5;
        }
      }

      return newCellData;
    });
  };

  return (
    <CrosswordGrid
      cellData={cellData}
      // selectedCell={selectedCell}
      onKeyDown={onKeyDownHandler}
      onMouseDown={onMouseDownHandler}
    />
  );
};

export default Crossword;
