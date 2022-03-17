import { Link } from "react-router-dom";
import "./Home.css";
import Card from "../components/UI/Card";

const pages = [
  { path: "/crosswords", class: "homeImageSubContainer1", img: "crosswordcat.jpg", text: "Crosswords"},
  { path: "/books", class: "homeImageSubContainer2", img: "books.jpg", text: "Books"},
  { path: "/acrobatics", class: "homeImageSubContainer3", img: "acrobatics-3.jpg", text: "Acrobatics"},
  { path: "/development", class: "homeImageSubContainer4", img: "brent.jpg", text: "Web Development"},
];

const Home = () => {
  return (
    <Card className="homeImagesContainer dark">
      {/* <div className="homeImageMainContainer">
        <img
          src={require("../assets/brent.jpg").default}
          alt="Brent Aronsen"
          className="homeImageMain"
        />
      </div> */}
      {pages.map((page) => (
        <div key={page.path} className={`homeImageSubContainer ${page.class}`}>
          <Link to={page.path}>
            <img
              src={require(`../assets/${page.img}`).default}
              alt={page.text}
              className="homeImageSub"
            ></img>
            <p className="homeImageSubText">{page.text}</p>
          </Link>
        </div>
      ))}
    </Card>
  );
};

export default Home;
