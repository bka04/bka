import { useReducer } from "react";
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

const initialState = {
  cellData: DUMMYDATA,
  selectedCell: 0,
  across: true
}

const reducer = (state, action) => {
  const cellNum = parseInt(action.event.target.dataset.cellnum);
  let index = cellNum - 1;

  switch (action.type) {
    case 'keydown':
  
      //NEED TO ADD CHECK FOR LETTER!
      state.cellData[index].value = action.event.key;
      const newCellData = state.cellData.map((cell) => ({
        ...cell,
        focus: false, //set all other cells' focus to false
      }));
      //NEED TO ADD DOWN!! AND REFACTOR THIS
      if (state.across) {
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
        return {
          cellData: newCellData,
          selectedCell: index + 1,
          across: state.across
        }
      } else {
        //DOWN!
        return {
          cellData: state.cellData,
          selectedCell: state.selectedCell,
          across: state.across
        }
      }

    case 'mousedown':
  
      if (cellNum === state.selectedCell) {
        state.across = !state.across;
      }
      state.selectedCell = cellNum;
  
      //Highlight cells in same word (either across or down)
      const updCellData = state.cellData.map((cell) => ({
        ...cell,
        highlight: false, //set all other cells' highlight to false
      }));

      if (state.across) {
        //highlight letters in same word (across)
        //first, check to the right
        index++;
        while (index % 5 > 0) {
          if (updCellData[index].disabled) {
            break;
          }
          updCellData[index].highlight = true;
          index++;
        }
        //second, check to the left
        index = cellNum - 1;
        index--;
        while (index % 5 !== 4 && index >= 0) {
          if (updCellData[index].disabled) {
            break;
          }
          updCellData[index].highlight = true;
          index--;
        }
      } else {
        //first, check below
        index += 5;
        while (index < 25) {
          if (updCellData[index].disabled) {
            break;
          }
          updCellData[index].highlight = true;
          index += 5;
        }
        //second, check above
        index = cellNum - 1;
        index -= 5;
        while (index >= 0) {
          if (updCellData[index].disabled) {
            break;
          }
          updCellData[index].highlight = true;
          index -= 5;
        }
      }
      return {
        cellData: updCellData,
        selectedCell: state.selectedCell,
        across: state.across
      }
    default:
      throw new Error();
  }
}

const Crossword = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('rendered Crossword');

  const onKeyDownHandler = (event) => {
    dispatch({type: 'keydown', event})
  }

  const onMouseDownHandler = (event) => {
    dispatch({type: 'mousedown', event})
  };

  return (
    <CrosswordGrid
      cellData={state.cellData}
      onKeyDown={onKeyDownHandler}
      onMouseDown={onMouseDownHandler}
    />
  );
};

export default Crossword;
