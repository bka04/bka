import Crossword from "../components/crosswords/Crossword";


const ANSWERTEXT = 'glad shawauge purebloc agessugarcoat   doe   sweettalkiran icondisc minestye edge';

const ACROSSCLUES = [
  { number: 1, text: "Happy" },
  { number: 5, text: "Manchester United defender Luke" },
  { number: 9, text: "Telephus's mother in mythology" },
  { number: 10, text: "pure" },
  { number: 11, text: "bloc" },
  { number: 12, text: "ages" },
  { number: 13, text: "Garment of gumdrops?" },
  { number: 15, text: "Jane or John" },
  { number: 16, text: "Lecture on lollipops?" },
  { number: 22, text: "Iraq neighbor" },
  { number: 23, text: "icon" },
  { number: 24, text: "disc" },
  { number: 25, text: "mine" },
  { number: 26, text: "stye" },
  { number: 27, text: "edge" }
];

const DOWNCLUES = [
  { number: 1, text: "Jabbers" },
  { number: 2, text: "Athleisure giant, colloquially" },
  { number: 3, text: "Les Miserables song ABC Cafe/Red and Black: 'I am ___! I am aghast! Is Marius in love at last?'" },
  { number: 4, text: "decadence" },
  { number: 5, text: "Four-dimensional continuum" },
  { number: 6, text: "Les Miserables author" },
  { number: 7, text: "area" },
  { number: 8, text: "west" },
  { number: 14, text: "rot" },
  { number: 16, text: "sids" },
  { number: 17, text: "writ" },
  { number: 18, text: "easy" },
  { number: 19, text: "acid" },
  { number: 20, text: "long" },
  { number: 21, text: "knee" }
];

// const ANSWERTEXT = 'reactarguepairsisletdeeds';

// const ACROSSCLUES = [
//   { number: 1, text: "Respond.  Also a popular JavaScript framework" },
//   { number: 6, text: "Debate" },
//   { number: 7, text: "These are worth two points in cribbage" },
//   { number: 8, text: "Florida Keys, e.g." },
//   { number: 9, text: "Home ownership documents" },
// ];

// const DOWNCLUES = [
//   { number: 1, text: "With 5 down, same day COVID exams" },
//   { number: 2, text: "Remove" },
//   { number: 3, text: "Popular software development approach" },
//   { number: 4, text: "Healed" },
//   { number: 5, text: "See 1 down" },
// ];

const ANSWERS = ANSWERTEXT.split('').map(letter => letter.replace(' ', ''));
const CELLDATA = [];

for (let i = 0; i < ANSWERS.length; i++) {
  let focus = false;
  if (i === 0) {
    focus = true;
  }

  let locked = false;
  let disabled = false;
  let wrong = false;

  if (ANSWERS[i] === '') {
    disabled = true;
  }

  CELLDATA.push({
    id: i+1,
    disabled,
    focus,
    value: "",
    locked,
    wrong
  });
}

const Crosswords = (props) => {
  return (
    <Crossword
      initialCrosswordData={CELLDATA}
      acrossClues={ACROSSCLUES}
      downClues={DOWNCLUES}
      answers={ANSWERS}
    />
  );
};

export default Crosswords;