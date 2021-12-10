import classes from "./BookListItem.module.css";

const BookListItem = (props) => {
  const coverSrc = props.coverFile
    ? require("../../assets/" + props.coverFile).default
    : "";

  const onClickHandler = (event) => {
    props.onBookSelect(event.currentTarget.dataset["bookId"]);
  };

  return (
    <li
      className={`${classes.bookListItem} ${props.className}`}
      onClick={onClickHandler}
      data-book-id={props.id}
    >
      <img
        src={coverSrc}
        alt={props.title}
        width="160"
        height="200"
        className={`${classes.bookCover} ${props.border ? classes.thinBorder : ''}`}
      ></img>
      <h3 className={classes.bookTitle}>{props.title}</h3>
      <p className={classes.bookDesc}>{props.targetedAge}</p>
    </li>
  );
};

export default BookListItem;
