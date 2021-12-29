import { Fragment, useEffect, useReducer } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CrosswordClues from "./CrosswordClues";
import CrosswordGrid from "./CrosswordGrid";
import classes from './Crossword.module.css';


const TOTALCELLS = 25;
const COLS = 5;

//Populate the across and down question numbers for each cell
//Also determine which cells need to display a question number
const populateNumbers = (data) => {
  const newDownWord = (i) => {
    if (i - COLS < 0) {
      return true; //top row will have new numbers
    }
    if (data[i - COLS].disabled) {
      return true; //if cell above is disabled, need new number
    }
    return false;
  };

  const newAcrossWord = (i) => {
    if (i - 1 < 0) {
      return true; //first cell needs new number
    }
    if (i % COLS === 0) {
      return true; //first column needs new numbers
    }
    if (data[i - 1].disabled) {
      return true; //if cell to the left is disabled, need new number
    }
    return false;
  };

  let questionNum = 0;

  for (let i = 0; i < data.length; i++) {
    data[i].questionNumberDisplayed = 0;

    if (data[i].disabled) {
      continue;
    }

    const newDown = newDownWord(i);
    const newAcross = newAcrossWord(i);

    if (newDown || newAcross) {
      questionNum++;
      data[i].questionNumberDisplayed = questionNum; //Set number to be displayed in cell
    }

    if (newDown) {
      data[i].questionNumberDown = questionNum; //New down number
    } else {
      data[i].questionNumberDown = data[i - COLS].questionNumberDown; //Get down number for cell above
    }
    if (newAcross) {
      data[i].questionNumberAcross = questionNum; //New across number
    } else {
      data[i].questionNumberAcross = data[i - 1].questionNumberAcross; //Get down number for cell to the left
    }
  }

  return data;
};

const initialState = {
  cellData: [],
  selectedCell: 0,
  across: true,
};

const updateHighlighting = (state, index) => {
  const questionNumberProp = state.across
    ? "questionNumberAcross"
    : "questionNumberDown";
  const currentQuestion = state.cellData[index][questionNumberProp];

  state.cellData.forEach((el, index) => {
    if (el[questionNumberProp] === currentQuestion) {
      state.cellData[index].highlight = true;
    }
  });

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

const getNextWord = (state, index) => {
  const questionNumberProp = state.across
  ? "questionNumberAcross"
  : "questionNumberDown";
  const currentQuestionNumber = state.cellData[index][questionNumberProp];

  const maxQuestionNumber = Math.max.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 0));
  
  if (currentQuestionNumber === maxQuestionNumber) { //if already at the highest down or across question number, get the lowest
    const minQuestionNumber = Math.min.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 999));
    return state.cellData.findIndex(x => x[questionNumberProp] === minQuestionNumber);
  }

  for (let q = currentQuestionNumber + 1; q <= maxQuestionNumber; q++) {
    const newIndex = state.cellData.findIndex(x => x[questionNumberProp] === q);
    if (newIndex > -1) {
      return newIndex; //return if valid. Otherwise, add 1 and try again.
    }
  }

}

const reducer = (state, action) => {
  if (action.type === "loadStateFromStorage") {
    return action.storedCrosswordData;
  }

  if (action.type === "resetGrid") {
    const DUMMYDATA = [];
    for (let i = 1; i < 26; i++) {
      let focus = false;
      if (i === 1) {
        focus = true;
      }

      let disabled = false;
      //TESTING
      // if (i === 8 || i === 14) {
      //   disabled = true;
      // }

      DUMMYDATA.push({
        id: i,
        disabled,
        focus,
        value: "",
      });
    }

    localStorage.removeItem("crosswordData");
    state.cellData = populateNumbers(DUMMYDATA);
    state.across = true;
    state.cellData = updateHighlighting(state, 0);
    return {
      cellData: state.cellData,
      selectedCell: 0,
      across: true,
    };
  } //end resetGrid

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
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData; //end click (mousedown) or space/enter keydown
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
      localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
      return crosswordData;
    } //end backspace/delete

    if (
      (action.event.keyCode < 65 || action.event.keyCode > 90) && //not a letter
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //not a valid input; return without any changes
      const crosswordData = {
        cellData: state.cellData,
        selectedCell: state.selectedCell,
        across: state.across,
      };
      localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
      return crosswordData;
    }

    if (
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //a letter was entered; set to keypress
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
      case 9: //tab
        index = getNextWord(state, index);
        break;
      default: //letter
        index = getNextCell(state, index);
    }

    state.cellData[index].focus = true;
    state.cellData = updateHighlighting(state, index);

    const crosswordData = {
      cellData: state.cellData,
      selectedCell: index + 1,
      across: state.across,
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData; //end keydown
  } else {
    throw new Error();
  }
};

const Crossword = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedCrosswordData = JSON.parse(
      localStorage.getItem("crosswordData")
    );

    if (storedCrosswordData !== null) {
      dispatch({ type: "loadStateFromStorage", storedCrosswordData });
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
      <div className={classes.crosswordContent}>
        <Card className='dark'><CrosswordGrid
          cellData={state.cellData}
          onKeyDown={onKeyDownHandler}
          onMouseDown={onMouseDownHandler}
        /></Card>
        <Card className='dark'><CrosswordClues /></Card>
      </div>
      <Button className="resetBtn" onClick={resetGrid}>
        Reset
      </Button>
    </Fragment>
  );
};

export default Crossword;
