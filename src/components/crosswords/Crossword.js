import { Fragment, useEffect, useReducer } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import CrosswordClues from "./CrosswordClues";
import CrosswordGrid from "./CrosswordGrid";
// import CrosswordStatus from "./CrosswordStatus";
import CrosswordPowerUps from "./CrosswordPowerUps";
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

const getSelectedWord = (state) => {
  const direction = state.across ? "Across" : "Down"; //is across or down selected?
  const word = state.cellData.filter(cell => //get all data on this word
    cell[`questionNumber${direction}`] === 
    state.cellData[state.selectedCell - 1][`questionNumber${direction}`]
  );
  return word;
}

const checkGridAgainstAnswers = (state, answers) => {
  const gridLetters = state.cellData.map(cell => cell.value); //get letters from screen
  return gridLetters.every((val, index) => val === answers[index]); //every letter correct?
}

const handleSolvedGrid = (state) => {
  state.cellData = state.cellData.map((cell) => ({...cell, locked: true}));
  alert("Well solved, crossworder!");
  return state;
}

const reducer = (state, action) => {
  if (action.type === "loadStateFromStorage") {
    return action.storedCrosswordData;
  }

  let newState = {...state, cellData: state.cellData.slice()}; //to avoid directly mutating state

  if (action.type === "resetGrid") {
    localStorage.removeItem("crosswordData");
    newState.cellData = clearCellValues(action.initialCrosswordData);
    newState.cellData = populateNumbers(newState.cellData);
    newState.across = true;
    newState.cellData = updateHighlighting(newState, 0);
    return {
      cellData: newState.cellData,
      selectedCell: 1,
      across: true,
      cols: Math.sqrt(newState.cellData.length),
    };
  } //end resetGrid

  if (action.type === "selectCellFromClue") {

    newState.across = action.event.target.dataset.direction === 'Across' ? true : false;
    const index = newState.cellData.findIndex((cell) => 
      cell[`questionNumber${action.event.target.dataset.direction}`] === parseInt(action.event.target.dataset.questionNumber)
    );

    newState.cellData = clearCellDisplay(newState.cellData);
    newState.cellData[index].focus = true;
    newState.cellData = updateHighlighting(newState, index);
    
    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: index + 1,
      across: newState.across,
      cols: newState.cols,
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData;
  } //end selectCellFromClue

  if (action.type === "powerUp") {

    if (action.powerUp === "revealRandomLetter") {
      const incorrectLetters = newState.cellData.filter(cell => //filter for incorrect letters
        cell.value !== action.answers[cell.id - 1]
      );

      if (incorrectLetters.length > 0) { //any incorrect letters? get a random one and reveal
        const cellID = incorrectLetters[Math.floor(Math.random()*incorrectLetters.length)].id;
        newState.cellData[cellID - 1].value = action.answers[cellID - 1]; //set answer
        newState.cellData[cellID - 1].locked = true; //lock it
        newState.cellData[cellID - 1].wrong = false; //not wrong
        const solved = checkGridAgainstAnswers(newState, action.answers) //has grid been solved?
        if (solved) {
          newState = handleSolvedGrid(newState);
        }
      }
    }

    if (action.powerUp === "revealLetter" || action.powerUp === "revealWord") {
      
      let revealThis = []; //will be letter or word
      if (action.powerUp === "revealLetter") { 
        revealThis = newState.cellData.filter(cell => //selected letter
          cell.id === newState.cellData[newState.selectedCell - 1].id
        ); 
      } else {
        revealThis = getSelectedWord(newState); //selected word
      }

      revealThis.forEach(function(cell) {
        newState.cellData[cell.id - 1].value = action.answers[cell.id - 1]; //set answer
        newState.cellData[cell.id - 1].locked = true; //lock it
        newState.cellData[cell.id - 1].wrong = false; //not wrong
      });

      const solved = checkGridAgainstAnswers(newState, action.answers) //has grid been solved?
      if (solved) {
        newState = handleSolvedGrid(newState);
      }

    }

    if (action.powerUp === "verifyWord" || action.powerUp === "verifyGrid") {

      let verifyThis = []; //will be word or entire grid
      if (action.powerUp === "verifyWord") {
        verifyThis = getSelectedWord(newState); //selected word
      } else {
        verifyThis = newState.cellData; //entire grid
      }

      verifyThis.forEach(function(cell) {
        //check what was entered vs the answer
        let correct = (newState.cellData[cell.id - 1].value === action.answers[cell.id - 1]);
        if (correct) { //is letter entered correct?
          newState.cellData[cell.id - 1].locked = true; //set locked to true
        } else {
          newState.cellData[cell.id - 1].wrong = true; //set wrong to true
        }
      });
    }

    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: newState.selectedCell,
      across: newState.across,
      cols: newState.cols,
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData;
  } //end powerUp

  action.event.preventDefault();
  const cellNum = parseInt(action.event.target.dataset.cellnum);
  let index = cellNum - 1;

  if (
    action.type === "mousedown" ||
    (action.type === "keydown" &&
      (action.event.keyCode === 13 || action.event.keyCode === 32)) //space/enter
  ) {
    if (cellNum === newState.selectedCell) {
      newState.across = !newState.across;
    }

    newState.cellData = clearCellDisplay(newState.cellData);
    newState.cellData[index].focus = true;
    newState.cellData = updateHighlighting(newState, index);

    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: cellNum,
      across: newState.across,
      cols: newState.cols,
    };
    localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
    return crosswordData; //end click (mousedown) or space/enter keydown
  } else if (action.type === "keydown") {
    if (action.event.keyCode === 8 || action.event.keyCode === 46) {
      //backspace/delete
      if (newState.cellData[index].value === "") {
        index = getPrevCell(newState, index);
        newState.cellData = clearCellDisplay(newState.cellData);
        newState.cellData[index].focus = true;
        newState.cellData = updateHighlighting(newState, index);
      }
      if (!newState.cellData[index].locked) {
        newState.cellData[index].value = "";
        newState.cellData[index].wrong = false;
      }

      const crosswordData = {
        cellData: newState.cellData,
        selectedCell: index + 1,
        across: newState.across,
        cols: newState.cols
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
        cellData: newState.cellData,
        selectedCell: newState.selectedCell,
        across: newState.across,
        cols: newState.cols
      };
      localStorage.setItem("crosswordData", JSON.stringify(crosswordData));
      return crosswordData;
    }

    let solved = false;
    if (
      action.event.keyCode !== 9 && //not tab
      (action.event.keyCode < 37 || action.event.keyCode > 40) //not left/up/right/down
    ) {
      //a letter was entered; set to keypress if the letter changed and is not locked; check if solved
      if (!newState.cellData[index].locked && newState.cellData[index].value !== action.event.key) {
        newState.cellData[index].value = action.event.key; //set entered letter
        newState.cellData[index].wrong = false; //clear out any 'wrong' line-through
        solved = checkGridAgainstAnswers(newState, action.answers) //has grid been solved?
        if (solved) { //if so, lock all letters in grid and alert user of great success
          newState = handleSolvedGrid(newState);
        }
      }
    }

    newState.cellData = clearCellDisplay(newState.cellData);

    switch (action.event.keyCode) {
      case 37: //left arrow
        index = getPrevCell(newState, index, "across");
        break;
      case 38: //up arrow
        index = getPrevCell(newState, index, "down");
        break;
      case 39: //right arrow
        index = getNextCell(newState, index, "across");
        break;
      case 40: //down arrow
        index = getNextCell(newState, index, "down");
        break;
      case 9: //tab
        if (action.event.shiftKey) {
          index = getPrevWord(newState, index)
        } else {
          index = getNextWord(newState, index);
        }
        break;
      default: //letter
        if (!solved) {
          index = getNextCell(newState, index);
        }
    }

    newState.cellData[index].focus = true;
    newState.cellData = updateHighlighting(newState, index); 


    const crosswordData = {
      cellData: newState.cellData,
      selectedCell: index + 1,
      across: newState.across,
      cols: newState.cols
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
      localStorage.getItem("crosswordData") //get data saved to browswer
    );

    if (storedCrosswordData !== null) { //was there data saved to browser?
      dispatch({ type: "loadStateFromStorage", storedCrosswordData });
    } else {
      dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
    }
  }, [props.initialCrosswordData]);

  const onKeyDownHandler = (event) => {
    dispatch({ type: "keydown", event, answers: props.answers });
  };

  const onMouseDownHandler = (event) => {
    dispatch({ type: "mousedown", event });
  };

  const clueOnClickHandler = (event) => {
    dispatch({ type: "selectCellFromClue", event });
  };

  const powerUpOnClickHandler = (event) => {
    switch(event.target.id) {
      case "verifyWord":
        dispatch({type: "powerUp", powerUp: "verifyWord", event, answers: props.answers});
        break;
      case "revealRandomLetter":
        dispatch({type: "powerUp", powerUp: "revealRandomLetter", event, answers: props.answers});  
        break;
      case "revealLetter":
        dispatch({type: "powerUp", powerUp: "revealLetter", event, answers: props.answers});
        break;
      // case "revealLetterEverywhere":
      //   dispatch({type: "powerUp", powerUp: "revealLetterEverywhere", event, answers: props.answers});
      //   break;
      case "verifyGrid":
        dispatch({type: "powerUp", powerUp: "verifyGrid", event, answers: props.answers});
        break;
      case "revealWord":
        dispatch({type: "powerUp", powerUp: "revealWord", event, answers: props.answers});
        break;
      default:
        break;  
    }

  }

  const resetGrid = (event) => {
    if (window.confirm("Are you sure you want to reset the puzzle?")) {
      dispatch({ type: "resetGrid", initialCrosswordData: props.initialCrosswordData });
    }
  };

  const getSelectedQuestionNumber = (state, direction) => {
    const index = state.cellData.findIndex((cell) => cell.id === state.selectedCell);
    return (index > -1) ? state.cellData[index][`questionNumber${direction}`] : 1;

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
      {/* <Card className='dark'>
        <CrosswordStatus />
      </Card> */}
      <Card className='dark'>
        <CrosswordPowerUps 
          onClick={powerUpOnClickHandler}
        />
      </Card>
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
      <div>
        <p>Game icons made by Freepik from www.flaticon.com</p>
      </div>
    </Fragment>
  );
};

export default Crossword;
