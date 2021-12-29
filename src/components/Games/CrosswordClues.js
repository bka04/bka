import "./CrosswordClues.css";

const CrosswordClues = (props) => {
  return (
    <div className="clues">
      <h4>{props.direction}</h4>
      <ul className="clueList">
        {props.clues.map((clue) => {
          return (
            <li key={clue.number}>
              {clue.number}. &nbsp;{clue.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CrosswordClues;
