import classes from "./BookList.module.css";
import BookListItem from "./BookListItem";

const BookList = (props) => {
  return (
    <ul className={classes.bookList}>
      {props.books.map((book) => (
        <BookListItem
          key={book.id}
          id={book.id}
          title={book.title}
          coverFile={book.coverFile}
          targetedAge={book.targetedAge}
          onBookSelect={props.onBookSelect}
          border={book.border}
        />
      ))}
    </ul>
  );
};

export default BookList;
