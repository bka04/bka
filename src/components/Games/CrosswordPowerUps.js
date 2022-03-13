import "./CrosswordPowerUps.css";

const icons = [
  {id: "checkmark", text: "Verify Word"},
  {id: "die", text: "Reveal Random Letter"},
  {id: "k", text: "Reveal Letter"},
  {id: "buyLetter", text: "Reveal Letter Everywhere"},
  {id: "check", text: "Verify Grid"},
  {id: "word", text: "Reveal Word"}
];

const crosswordPowerUps = (props) => {
  return (
    <div className="crosswordPowerUps">
      {icons.map((icon) => (
        <div className="crosswordPowerUp">
        <img 
          src={require("../../assets/icon-" + icon.id + ".png").default}
          alt={icon.text}
          width="50"
          height="50"
          key={icon.id}
        />
        <span className='tooltiptext'>{icon.text}</span>
        </div>
      ))}
    </div>
  )
}

export default crosswordPowerUps;