import { Fragment, useEffect, useReducer } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CrosswordClues from "./CrosswordClues";
import CrosswordGrid from "./CrosswordGrid";
import './Crossword.css';
import CrosswordActiveClue from "./CrosswordActiveClue";


//Populate the across and down question numbers for each cell
//Also determine which cells need to display a question number
const populateNumbers = (data) => {
  const COLS = Math.sqrt(data.length);

  const newDownWord = (i) => {
    if (i - COLS < 0) {
      return true; //top row will have new numbers
    }
    if (data[i - COLS].disabled) {
      return true; //if cell above is disabled, need new number
    }
    return false;
  }; //end newDownWord

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
  }; //end newAcrossWord

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
}; //end populateNumbers

const initialState = {
  cellData: [],
  selectedCell: 0,
  across: true,
  cols: 0
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
const clearCellDisplay = (cellData) => {
  return cellData.map((cell) => ({
    ...cell,
    highlight: false,
    focus: false,
  }));
};

const clearCellValues = (cellData) => {
  return cellData.map((cell) => ({
    ...cell,
    value: ''
  }));
}

const getNextCell = (state, index, directionOverride = "") => {
  const TOTALCELLS = Math.pow(state.cols, 2);
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
    index += state.cols;
    if (index === TOTALCELLS - 1 + state.cols) {
      index = 0;
    } else if (index > TOTALCELLS - 1) {
      index -= TOTALCELLS - 1;
    }
    while (index < TOTALCELLS) {
      if (!state.cellData[index].disabled) {
        break;
      }
      index += state.cols;
      if (index > TOTALCELLS - 1) {
        index -= TOTALCELLS - 1;
      }
    }
  }
  return index;
};

const getPrevCell = (state, index, directionOverride = "") => {
  const TOTALCELLS = Math.pow(state.cols, 2);
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
    index -= state.cols;
    if (index === 0 - state.cols) {
      index = TOTALCELLS - 1;
    } else if (index < 0) {
      index += TOTALCELLS - 1;
    }
    while (index > 0) {
      if (!state.cellData[index].disabled) {
        break;
      }
      index -= state.cols;
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

const getPrevWord = (state, index) => {
  const questionNumberProp = state.across
  ? "questionNumberAcross"
  : "questionNumberDown";
  const currentQuestionNumber = state.cellData[index][questionNumberProp];

  const minQuestionNumber = Math.min.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 999));
  
  if (currentQuestionNumber === minQuestionNumber) { //if already at the lowest down or across question number, get the highest
    const maxQuestionNumber = Math.max.apply(null, state.cellData.map(cell => cell[questionNumberProp] ? cell[questionNumberProp] : 0));
    return state.cellData.findIndex(x => x[questionNumberProp] === maxQuestionNumber);
  }

  for (let q = currentQuestionNumber - 1; q >= minQuestionNumber; q--) {
    const newIndex = state.cellData.findIndex(x => x[questionNumberProp] === q);
    if (newIndex > -1) {
      return newIndex; //return if valid. Otherwise, subtract 1 and try again.
    }
  }
}

const reducer = (state, action) => {
  if (action.type === "loadStateFromStorage") {
    return action.storedCrosswordData;
  }

  if (action.type === "resetGrid") {
    localStorage.removeItem("crosswordData");
    state.cellData = clearCellValues(action.initialCrosswordData);
    state.cellData = populateNumbers(state.cellData);
    state.across = true;
    state.cellData = updateHighlighting(state, 0);
    return {
      cellData: state.cellData,
      selectedCell: 0,
      across: true,
      cols: Math.sqrt(state.cellData.length),
    };
  } //end resetGrid

  if (action.type === "selectCellFromClue") {

    state.across = action.event.target.dataset.direction === 'Across' ? true : false;
    const index = state.cellData.findIndex((cell) => 
      cell[`questionNumber${action.event.target.dataset.direction}`] === parseInt(action.event.target.dataset.questionNumber)
    );

    state.cellData = clearCellDisplay(state.cellData);
    state.cellData[index].focus = true;
    state.cellData = updateHighlighting(state, index);
    
    const crosswordData = {
      cellData: state.cellData,
      selectedCell: index + 1,
      across: state.across,
      cols: state.cols,
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData;
  } //end selectCellFromClue

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

    state.cellData = clearCellDisplay(state.cellData);
    state.cellData[index].focus = true;
    state.cellData = updateHighlighting(state, index);

    const crosswordData = {
      cellData: state.cellData,
      selectedCell: cellNum,
      across: state.across,
      cols: state.cols,
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData; //end click (mousedown) or space/enter keydown
  } else if (action.type === "keydown") {
    if (action.event.keyCode === 8 || action.event.keyCode === 46) {
      //backspace/delete
      if (state.cellData[index].value === "") {
        index = getPrevCell(state, index);
        state.cellData = clearCellDisplay(state.cellData);
        state.cellData[index].focus = true;
        state.cellData = updateHighlighting(state, index);
      }
      state.cellData[index].value = "";

      const crosswordData = {
        cellData: state.cellData,
        selectedCell: index + 1,
        across: state.across,
        cols: state.cols
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
        cols: state.cols
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

    state.cellData = clearCellDisplay(state.cellData);

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
        if (action.event.shiftKey) {
          index = getPrevWord(state, index)
        } else {
          index = getNextWord(state, index);
        }
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
      cols: state.cols
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
      dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
    }
  }, [props.initialCrosswordData]);

  const onKeyDownHandler = (event) => {
    dispatch({ type: "keydown", event });
  };

  const onMouseDownHandler = (event) => {
    dispatch({ type: "mousedown", event });
  };

  const clueOnClickHandler = (event) => {
    dispatch({ type: "selectCellFromClue", event });
  };

  const resetGrid = (event) => {
    if (window.confirm("Are you sure you want to reset the puzzle?")) {
      dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
    }
  };

  const getSelectedQuestionNumber = (state, direction) => {
    const index = state.cellData.findIndex((cell) => cell.id === state.selectedCell);
    return (index > -1) ? state.cellData[index][`questionNumber${direction}`] : 0;

  };

  const getSelectedQuestionText = (number, direction) => {
    if (direction === 'Across') {
      const index = props.acrossClues.findIndex((clue) => clue.number === number);
      return (index > -1) ? props.acrossClues[index].text : '';
    } else {
      const index = props.downClues.findIndex((clue) => clue.number === number);
      return (index > -1) ? props.downClues[index].text : '';
    }
  }

  return (
    <Fragment>
      <div className='crosswordContent'>
        <Card className='dark crosswordCluesCard'>
          <CrosswordClues 
            onClick={clueOnClickHandler}
            clueDirection='Across' 
            clues={props.acrossClues}
            selectedDirection={state.across ? 'Across' : 'Down'}
            selectedQuestion={getSelectedQuestionNumber(state, 'Across')}
          />
        </Card>
        <Card className='dark crosswordGridCard'>
          <CrosswordGrid
            cellData={state.cellData}
            cols={state.cols}
            onKeyDown={onKeyDownHandler}
            onMouseDown={onMouseDownHandler}
          />
          <CrosswordActiveClue 
            text={getSelectedQuestionText(
              getSelectedQuestionNumber(state, `${state.across ? 'Across' : 'Down'}`),
              `${state.across ? 'Across' : 'Down'}`)} 
          />
        </Card>
        <Card className='dark crosswordCluesCard'>
          <CrosswordClues 
            onClick={clueOnClickHandler}
            clueDirection='Down' 
            clues={props.downClues}
            selectedDirection={state.across ? 'Across' : 'Down'}
            selectedQuestion={getSelectedQuestionNumber(state, 'Down')}
          />
        </Card>
      </div>
      <Button className="resetBtn" onClick={resetGrid}>
        Reset
      </Button>
    </Fragment>
  );
};

export default Crossword;
