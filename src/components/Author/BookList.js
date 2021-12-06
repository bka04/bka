import "./BookList.css";
import BookListItem from "./BookListItem";

const BookList = (props) => {
  return (
    <ul>
      {props.books.map((book) => (
        <BookListItem
          key={book.id}
          id={book.id}
          title={book.title}
          coverFile={book.coverFile}
          descriptionShort={book.descriptionShort}
          onBookSelect={props.onBookSelect}
        />
      ))}
    </ul>
  );
};

export default BookList;
