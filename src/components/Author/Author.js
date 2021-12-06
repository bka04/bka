import { Fragment, useState } from "react";
import Card from "../UI/Card";
import BookList from "./BookList";
import BookDetails from "./BookDetails";

const BOOKS = [
  {
    id: "twiwu",
    title: "The World Is Waking Up",
    coverFile: "twiwu-cover.jpg",
    descriptionShort: "Lotsa fun",
    descriptionLong: "",
    amazonURL:
      "https://www.amazon.com/World-Waking-Up-Brent-Aronsen/dp/1090354916/",
  },
  {
    id: "amu",
    title: "All Mixed Up",
    descriptionShort: "Kid fun",
    descriptionLong: "",
    amazonURL:
      "https://www.amazon.com/All-Mixed-Up-Collection-Limericks/dp/1494414708",
  },
  {
    id: "afs",
    title: "Animal Fashion Show",
    coverFile: "afs-cover.jpg",
    descriptionShort: "Animal fun",
    descriptionLong: "",
    amazonURL: "https://www.amazon.com/gp/product/1505485991/",
  },
  {
    id: "yoga",
    title: "Yoga Poems For the Rest of Us",
    descriptionShort: "Yoga fun",
    descriptionLong: "",
    amazonURL: "https://www.amazon.com/gp/product/1502383462/",
  },
];

const Author = (props) => {
  const [selectedBookId, setSelectedBook] = useState(BOOKS[0].id);

  const bookSelectHandler = (bookId) => {
    setSelectedBook(bookId);
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Author;
