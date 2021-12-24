import { useReducer } from "react";
import CrosswordGrid from "./CrosswordGrid";

const DUMMYDATA = [];

for (var i = 1; i < 26; i++) {
  //TESTING
  let disabled = "";
  if (i === 8) {
    disabled = "disabled";
  }

  DUMMYDATA.push({
    id: i,
    disabled,
    focus: false,
    value: "",
  });
}

const initialState = {
  cellData: DUMMYDATA,
  selectedCell: 0,
  across: true,
};

const updateHighlighting = (state, index) => {
  const cellNum = index + 1;
  if (state.across) {
    //highlight letters in same word (across)
    //first, check to the right
    index++;
    while (index % 5 > 0) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index++;
    }
    //second, check to the left
    index = cellNum - 1;
    index--;
    while (index % 5 !== 4 && index >= 0) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index--;
    }
  } else {
    //highlight letters in same word (down)
    //first, check below
    index += 5;
    while (index < 25) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index += 5;
    }
    //second, check above
    index = cellNum - 1;
    index -= 5;
    while (index >= 0) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index -= 5;
    }
  }
  return state.cellData;
};

//reset highlight and focus for all cells
const clearCellDisplay = (state) => {
  return state.cellData.map((cell) => ({
    ...cell,
    highlight: false,
    focus: false,
  }));
};

const getNextCell = (state, index) => {
  if (state.across) {
    index++;
    if (index === 25) {
      index = 0;
    }
    while (index < 25) {
      if (state.cellData[index].disabled === "") {
        break;
      }
      index++;
      if (index === 24) {
        index = 0;
      }
    }
  } else { //down
    index += 5;
    if (index === 24 + 5) {
      index = 0;
    } else if (index > 24) {
      index -= 24;
    } 
    while (index < 25) {
      if (state.cellData[index].disabled === "") {
        break;
      }
      index += 5;
      if (index > 24) {
        index -= 24;
      }
    }


  }
  return index;
};

const reducer = (state, action) => {
  const cellNum = parseInt(action.event.target.dataset.cellnum);
  let index = cellNum - 1;

  switch (action.type) {
    case "keydown":
      action.event.preventDefault();
      if (action.event.keyCode < 65 || action.event.keyCode > 90) {
        return {
          cellData: state.cellData,
          selectedCell: state.selectedCell,
          across: state.across,
        };
      }
      state.cellData[index].value = action.event.key;
      state.cellData = clearCellDisplay(state);
      index = getNextCell(state, index);
      state.cellData[index].focus = true;
      state.cellData = updateHighlighting(state, index);

      return {
        cellData: state.cellData,
        selectedCell: index + 1,
        across: state.across,
      };

    case "mousedown":
      if (cellNum === state.selectedCell) {
        state.across = !state.across;
      }

      state.cellData = clearCellDisplay(state);
      state.cellData[index].focus = true;
      state.cellData = updateHighlighting(state, index);

      return {
        cellData: state.cellData,
        selectedCell: cellNum,
        across: state.across,
      };
    default:
      throw new Error();
  }
};

const Crossword = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("rendered Crossword");

  const onKeyDownHandler = (event) => {
    dispatch({ type: "keydown", event });
  };

  const onMouseDownHandler = (event) => {
    dispatch({ type: "mousedown", event });
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
