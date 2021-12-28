import { Fragment } from "react";
import classes from "./BookList.module.css";
import BookListItem from "./BookListItem";

const BookList = (props) => {
  return (
    <Fragment>
      <h3 className={classes.bookListHeader}>Select a book to see details!</h3>
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
            className={(book.id === props.selectedBookId) ? 'selected' : ''}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default BookList;
