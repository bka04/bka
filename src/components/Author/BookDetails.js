import classes from "./BookDetails.module.css";

const BookDetails = (props) => {
  const { book } = props;

  const coverSrc = book.coverFile
    ? require("../../assets/" + book.coverFile).default
    : "";

  return (
    <div id="test" className={classes.container}>
      <img
        src={coverSrc}
        alt={book.title}
        width="320"
        height="400"
        className={`bookCover${book.border ? " thinBorder" : ""}`}
      ></img>
      <div className={classes.details}>
        <h3>{book.title}</h3>
        <a
          href={book.amazonURL}
          target="_blank"
          rel="noreferrer"
        >{`Buy now on Amazon!`}
          <span className="material-icons">open_in_new</span>
        </a>
        <div dangerouslySetInnerHTML={{__html: book.descriptionLong}}></div>
      </div>
    </div>
  );
};

export default BookDetails;
