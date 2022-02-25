import "./CrosswordPowerUps.css";

const icons = [
  {id: "die", alt: "Reveal Random Letter"},
  {id: "k", alt: "Reveal Letter"},
  {id: "checkmark", alt: "Verify Word"},
  {id: "buyLetter", alt: "Reveal Letter Everywhere"},
  {id: "check", alt: "Verify Grid"},
  {id: "word", alt: "Reveal Word"}
];

const crosswordPowerUps = (props) => {
  return (
    <div className="crosswordPowerUps">
      {icons.map((icon) => (
        <img 
          src={require("../../assets/icon-" + icon.id + ".png").default}
          alt={icon.alt}
          width="50"
          height="50"
          key={icon.id}
        />
      ))}
    </div>
  )
}

export default crosswordPowerUps;