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
    descriptionShort: "Elementary/Middle School",
    descriptionLong: "",
    amazonURL:
      "https://www.amazon.com/World-Waking-Up-Brent-Aronsen/dp/1090354916/",
  },
  {
    id: "amu",
    title: "All Mixed Up",
    coverFile: "amu-cover.jpg",
    descriptionShort: "Elementary",
    descriptionLong: "",
    amazonURL:
      "https://www.amazon.com/All-Mixed-Up-Collection-Limericks/dp/1494414708",
  },
  {
    id: "afs",
    title: "Animal Fashion Show",
    coverFile: "afs-cover.jpg",
    descriptionShort: "Elementary",
    descriptionLong: "",
    amazonURL: "https://www.amazon.com/gp/product/1505485991/",
  },
  {
    id: "yoga",
    title: "Yoga Poems For the Rest of Us",
    coverFile: "yoga-cover.jpg",
    descriptionShort: "Yogis of all ages!",
    descriptionLong: "",
    amazonURL: "https://www.amazon.com/gp/product/1502383462/",
    border: true
  },
];

const Author = (props) => {
  const [selectedBookId, setSelectedBook] = useState(BOOKS[0].id);

  const bookSelectHandler = (bookId) => {
    setSelectedBook(bookId);
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
        <BookList books={BOOKS} onBookSelect={bookSelectHandler} />
      </Card>
    </div>
  );
};

export default Author;
