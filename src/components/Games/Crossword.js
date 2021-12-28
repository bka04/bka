import { Fragment, useEffect, useReducer } from "react";
import Button from "../UI/Button";
import CrosswordGrid from "./CrosswordGrid";

const TOTALCELLS = 25;
const COLS = 5;

const populateNumbers = (data) => {
  //   Go across (increment by one). Check:
  // Down:
  //   1) cell below (plus COLS) is not disabled and not greater than TOTALCELLS
  //   2) cell above (minus COLS) IS disabled OR less than zero
  // Across:
  //   1) cell right is not disabled and not past end of row
  //   2) cell left IS disabled OR beginning of row

  // let questionNumber = 1;
  // for (let i = 0; i < data.length; i++) {
  //   //check down
  //   if (!data[i + COLS].disabled && data[i + COLS]
  // }

  return data;
};

const initialState = {
  cellData: [],
  selectedCell: 0,
  across: true,
};

const updateHighlighting = (state, index) => {
  const cellNum = index + 1;
  if (!state.cellData[index].disabled) {
    state.cellData[index].highlight = true;
  }
  if (state.across) {
    //highlight letters in same word (across)
    //first, check to the right
    index++;
    while (index % COLS > 0) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index++;
    }
    //second, check to the left
    index = cellNum - 1;
    index--;
    while (index % COLS !== COLS - 1 && index >= 0) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index--;
    }
  } else {
    //highlight letters in same word (down)
    //first, check below
    index += COLS;
    while (index < TOTALCELLS) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index += COLS;
    }
    //second, check above
    index = cellNum - 1;
    index -= COLS;
    while (index >= 0) {
      if (state.cellData[index].disabled) {
        break;
      }
      state.cellData[index].highlight = true;
      index -= COLS;
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

//is there a way to do shift tab too or not?
const getNextCell = (state, index, directionOverride = "") => {
  if (
    (state.across || directionOverride === "across") &&
    directionOverride !== "down"
  ) {
    index++;
    if (index === TOTALCELLS) {
      index = 0;
    }
    while (index < TOTALCELLS) {
      if (!state.cellData[index].disabled) {
        break;
      }
      index++;
      if (index === TOTALCELLS - 1) {
        index = 0;
      }
    }
  } else {
    //down
    index += COLS;
    if (index === TOTALCELLS - 1 + COLS) {
      index = 0;
    } else if (index > TOTALCELLS - 1) {
      index -= TOTALCELLS - 1;
    }
    while (index < TOTALCELLS) {
      if (!state.cellData[index].disabled) {
        break;
      }
      index += COLS;
      if (index > TOTALCELLS - 1) {
        index -= TOTALCELLS - 1;
      }
    }
  }
  return index;
};

const getPrevCell = (state, index, directionOverride = "") => {
  if (
    (state.across || directionOverride === "across") &&
    directionOverride !== "down"
  ) {
    index--;
    if (index < 0) {
      index = TOTALCELLS - 1;
    }
    while (index >= 0) {
      if (!state.cellData[index].disabled) {
        break;
      }
      index--;
      if (index < 0) {
        index = TOTALCELLS - 1;
      }
    }
  } else {
    //down
    index -= COLS;
    if (index === 0 - COLS) {
      index = TOTALCELLS - 1;
    } else if (index < 0) {
      index += TOTALCELLS - 1;
    }
    while (index > 0) {
      if (!state.cellData[index].disabled) {
        break;
      }
      index -= COLS;
      if (index < 0) {
        index += TOTALCELLS - 1;
      }
    }
  }
  return index;
};

const reducer = (state, action) => {

  if (action.type === "loadStateFromStorage") {
    return action.storedCrosswordData;
  }

  if (action.type === "resetGrid") {
    const DUMMYDATA = [];
    for (let i = 1; i < 26; i++) {
      //TESTING
      let focus = false;
      if (i === 1) {
        focus = true;
      }
      let disabled = false;
      if (i === 8 || i === 14) {
        disabled = true;
      }

      DUMMYDATA.push({
        id: i,
        disabled,
        focus,
        value: "",
      });
    }
    
    localStorage.removeItem('crosswordData');
    return {
      cellData: populateNumbers(DUMMYDATA),
      selectedCell: 0,
      across: true,
    };
  }

  action.event.preventDefault();
  const cellNum = parseInt(action.event.target.dataset.cellnum);
  let index = cellNum - 1;

  if (
    action.type === "mousedown" ||
    (action.type === "keydown" &&
      (action.event.keyCode === 13 || action.event.keyCode === 32)) //space/enter
  ) {
    if (cellNum === state.selectedCell) {
      state.across = !state.across;
    }

    state.cellData = clearCellDisplay(state);
    state.cellData[index].focus = true;
    state.cellData = updateHighlighting(state, index);

    const crosswordData = {
      cellData: state.cellData,
      selectedCell: cellNum,
      across: state.across,
    }
    localStorage.setItem('crosswordData', JSON.stringify(crosswordData));
    return crosswordData;

  } else if (action.type === "keydown") {
    if (action.event.keyCode === 8 || action.event.keyCode === 46) {
      //backspace/delete
      if (state.cellData[index].value === "") {
        index = getPrevCell(state, index);
        state.cellData = clearCellDisplay(state);
        state.cellData[index].focus = true;
        state.cellData = updateHighlighting(state, index);
      }
      state.cellData[index].value = "";

      const crosswordData = {
        cellData: state.cellData,
        selectedCell: index + 1,
        across: state.across,
      };
      localStorage.setItem('crosswordData', JSON.stringify(crosswordData));
      return crosswordData;
    }

    if (
      (action.event.keyCode < 65 || action.event.keyCode > 90) && //not a letter
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      const crosswordData = {
        cellData: state.cellData,
        selectedCell: state.selectedCell,
        across: state.across,
      };
      localStorage.setItem('crosswordData', JSON.stringify(crosswordData));
      return crosswordData;
    }

    if (
      action.event.keyCode !== 9 &&
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //except for tab/arrow, set to keypress
      state.cellData[index].value = action.event.key;
    }

    state.cellData = clearCellDisplay(state);

    switch (action.event.keyCode) {
      case 37: //left arrow
        index = getPrevCell(state, index, "across");
        break;
      case 38: //up arrow
        index = getPrevCell(state, index, "down");
        break;
      case 39: //right arrow
        index = getNextCell(state, index, "across");
        break;
      case 40: //down arrow
        index = getNextCell(state, index, "down");
        break;
      default:
        index = getNextCell(state, index);
    }

    state.cellData[index].focus = true;
    state.cellData = updateHighlighting(state, index);

    const crosswordData = {
      cellData: state.cellData,
      selectedCell: index + 1,
      across: state.across,
    };
    localStorage.setItem('crosswordData', JSON.stringify(crosswordData));
    return crosswordData;
    
  } else {
    throw new Error();
  }
};

const Crossword = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedCrosswordData = JSON.parse(localStorage.getItem('crosswordData'));

    if (storedCrosswordData !== null) {
      dispatch({type: "loadStateFromStorage", storedCrosswordData})
    } else {
      dispatch({ type: "resetGrid" });
    }

  }, []);

  const onKeyDownHandler = (event) => {
    dispatch({ type: "keydown", event });
  };

  const onMouseDownHandler = (event) => {
    dispatch({ type: "mousedown", event });
  };

  const resetGrid = (event) => {

    if (window.confirm("Are you sure you want to reset the puzzle?")) {
      dispatch({ type: "resetGrid" });
    }
  };

  return (
    <Fragment>
      <CrosswordGrid
        cellData={state.cellData}
        onKeyDown={onKeyDownHandler}
        onMouseDown={onMouseDownHandler}
      />
      <Button className='resetBtn' onClick={resetGrid}>Reset</Button>
    </Fragment>
  );
};

export default Crossword;
