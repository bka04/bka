import { useState } from "react";
import Card from "../UI/Card";
import BookList from "./BookList";
import BookDetails from "./BookDetails";
import classes from './Author.module.css';

const BOOKS = [
  {
    id: "twiwu",
    title: "The World Is Waking Up",
    coverFile: "twiwu-cover.jpg",
    targetedAge: "Elementary/Middle School",
    descriptionLong: "<p>We thought we were great<br>At hide-and-go-seek<br>For we hadn't been found<br>In over a week.<br></p>" +
    "<p>But suddenly today,<br>We figured out why:<br>Everyone who played<br>Decided to hide.<br></p>" +
    "<p>So reads one of the seventy-nine children's poems in this collection. From short and sweet to two page adventures, The World Is Waking Up's poems vary in length, tone, and form. Meet characters like Long-legged Lucy, waiting Willie, and exuberant, effervescently expressive Ed as you enjoy playful illustrations that accompany each poem.</p>",
    amazonURL:
      "https://www.amazon.com/World-Waking-Up-Brent-Aronsen/dp/1090354916/",
  },
  {
    id: "amu",
    title: "All Mixed Up",
    coverFile: "amu-cover.jpg",
    targetedAge: "Elementary",
    descriptionLong: "",
    amazonURL:
      "https://www.amazon.com/All-Mixed-Up-Collection-Limericks/dp/1494414708",
  },
  {
    id: "afs",
    title: "Animal Fashion Show",
    coverFile: "afs-cover.jpg",
    targetedAge: "Elementary",
    descriptionLong: "",
    amazonURL: "https://www.amazon.com/gp/product/1505485991/",
  },
  {
    id: "yoga",
    title: "Yoga Poems For the Rest of Us",
    coverFile: "yoga-cover.jpg",
    targetedAge: "Yogis of all ages!",
    descriptionLong: "",
    amazonURL: "https://www.amazon.com/gp/product/1502383462/",
    border: true
  },
];

const Author = (props) => {
  const [selectedBookId, setSelectedBookId] = useState(BOOKS[0].id);

  const bookSelectHandler = (bookId) => {
    setSelectedBookId(bookId);
  };

  return (
    <div className={classes.mainContainer}>
      <Card>
        <BookDetails
          book={BOOKS.find((bookObj) => {
            return bookObj.id === selectedBookId;
          })}
        />
      </Card>
      <Card>
        <BookList books={BOOKS} selectedBookId={selectedBookId} onBookSelect={bookSelectHandler} />
      </Card>
    </div>
  );
};

export default Author;
