import Crossword from "./Crossword";

const Games = (props) => {

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

  return (
    <Crossword initialCrosswordData={DUMMYDATA} />
  )
}

export default Games;