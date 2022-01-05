import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeImagesContainer">
      <img
        src={require("../assets/brent.jpg").default}
        alt="Brent Aronsen"
        className="homeImageMain"
      ></img>
      <Link to="/books">
        <img
          src={require("../assets/acrobatics-1.jpg").default}
          alt="Books"
          className="homeImage1 homeImageSub"
        ></img>
      </Link>
      <Link to="/games">
        <img
          src={require("../assets/acrobatics-2.jpg").default}
          alt="Crossword"
          className="homeImage2 homeImageSub"
        ></img>
      </Link>
      <Link to="/acrobatics">
        <img
          src={require("../assets/acrobatics-3.jpg").default}
          alt="Acrobatics"
          className="homeImage3 homeImageSub"
        ></img>
      </Link>
      <Link to="/development">
        <img
          src={require("../assets/acrobatics-4.jpg").default}
          alt="Computer"
          className="homeImage4 homeImageSub"
        ></img>
      </Link>
    </div>
  );
};

export default Home;
