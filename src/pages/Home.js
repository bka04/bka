import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeImagesContainer">
      <div className="homeImageMainContainer">
        <img
          src={require("../assets/brent.jpg").default}
          alt="Brent Aronsen"
          className="homeImageMain"
        />
      </div>
      <div className="homeImageSubContainer1 homeImageSubContainer">
        <Link to="/books">
          <img
            src={require("../assets/acrobatics-1.jpg").default}
            alt="Books"
            className="homeImageSub"
          ></img>
        <p className="homeImageSubText">Books</p>
        </Link>
      </div>
      <div className="homeImageSubContainer2 homeImageSubContainer">
        <Link to="/games">
          <img
            src={require("../assets/acrobatics-2.jpg").default}
            alt="Crossword"
            className="homeImageSub"
          ></img>
          <p className="homeImageSubText">Games</p>
        </Link>
      </div>
      <div className="homeImageSubContainer3 homeImageSubContainer">
        <Link to="/acrobatics">
          <img
            src={require("../assets/acrobatics-3.jpg").default}
            alt="Acrobatics"
            className="homeImageSub"
          ></img>
          <p className="homeImageSubText">Acrobatics</p>
        </Link>
      </div>
      <div className="homeImageSubContainer4 homeImageSubContainer">
        <Link to="/development">
          <img
            src={require("../assets/acrobatics-4.jpg").default}
            alt="Computer"
            className="homeImageSub"
          ></img>
          <p className="homeImageSubText">Web Development</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
