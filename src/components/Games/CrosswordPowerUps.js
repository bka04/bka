const crosswordPowerUps = (props) => {
  return (
    <div>
      <img
        src={require("../../assets/icon-k.png").default}
        alt="Letter Solver"
        width="50"
        height="50"
      ></img>
      <img
        src={require("../../assets/icon-die.png").default}
        alt="Random Word Solver"
        width="50"
        height="50"
      ></img>
      <img
        src={require("../../assets/icon-word.png").default}
        alt="Word Solver"
        width="50"
        height="50"
      ></img>
      <img
        src={require("../../assets/icon-check.png").default}
        alt="Grid Checker"
        width="50"
        height="50"
      ></img>
      <img
        src={require("../../assets/icon-buyLetter.png").default}
        alt="Buy A Letter"
        width="50"
        height="50"
      ></img>
    </div>
  )
}

export default crosswordPowerUps;