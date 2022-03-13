import Crossword from "../components/games/Crossword";

const DUMMYDATA = [];
for (let i = 1; i < 26; i++) {
  let focus = false;
  if (i === 1) {
    focus = true;
  }

  let locked = false;
  let disabled = false;
  //TESTING
  // if (i === 8 || i === 14) {
  //   disabled = true;
  //   locked = true;
  // }

  DUMMYDATA.push({
    id: i,
    disabled,
    focus,
    value: "",
    locked
  });
}

const ANSWERS = [
  'R', 'E', 'A', 'C', 'T', 
  'A', 'R', 'G', 'U', 'E', 
  'P', 'A', 'I', 'R', 'S', 
  'I', 'S', 'L', 'E', 'T',
  'D', 'E', 'E', 'D', 'S'
];

const ACROSSCLUES = [
  { number: 1, text: "Respond.  Also a popular JavaScript framework" },
  { number: 6, text: "Debate" },
  { number: 7, text: "These are worth two points in cribbage" },
  { number: 8, text: "Florida Keys, e.g." },
  { number: 9, text: "Home ownership documents" },
];

const DOWNCLUES = [
  { number: 1, text: "With 5 down, same day COVID exams" },
  { number: 2, text: "Remove" },
  { number: 3, text: "Popular software development approach" },
  { number: 4, text: "Honey ___ ham" },
  { number: 5, text: "See 1 down" },
];

const Games = (props) => {
  return (
    <Crossword
      initialCrosswordData={DUMMYDATA}
      acrossClues={ACROSSCLUES}
      downClues={DOWNCLUES}
      answers={ANSWERS}
    />
  );
};

export default Games;
