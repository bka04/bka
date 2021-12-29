import "./CrosswordClues.css";

const CrosswordClues = (props) => {

  return (
    <div className="clues">
      <h4>{props.clueDirection}</h4>
      <ul className="clueList">
        {props.clues.map((clue) => {
          return (
            <li
              key={clue.number}
              className={
                props.clueDirection === props.selectedDirection &&
                clue.number === props.selectedQuestion
                  ? "highlight"
                  : ""
              }
            >
              {clue.number}. &nbsp;{clue.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CrosswordClues;
