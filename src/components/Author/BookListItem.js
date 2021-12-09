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
      <img src={coverSrc} alt={props.title} width="160"></img>
      <div>
        <h3>{props.title}</h3>
        <p>{props.descriptionShort}</p>
      </div>
    </li>
  );
};

export default BookListItem;
