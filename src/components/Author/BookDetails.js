import { Fragment, useEffect } from "react";
import classes from "./BookDetails.module.css";

const BookDetails = (props) => {
  const { book } = props;

  const coverSrc = book.coverFile
    ? require("../../assets/" + book.coverFile).default
    : "";

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [])

  return (
    <Fragment>
      <div id="test" className={classes.container}>
        <img
          src={coverSrc}
          alt={book.title}
          width="320"
          height="400"
          className={`${classes.bookCover} bookCover${book.border ? " thinBorder" : ""}`}
        ></img>
        <div className={classes.details}>
          <div className={classes.detailHeading}>
            <h3>{book.title}</h3>
            <a href={book.amazonURL} target="_blank" rel="noreferrer">
              {`Buy now on Amazon!`}
              <span className="material-icons">open_in_new</span>
            </a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: book.descriptionLong }}></div>
        </div>
      </div>
      <div className={classes.footer}>
        <h5>Target age: &nbsp;{book.targetedAge}</h5>
        <h5>Page count: &nbsp;{book.pageCount}</h5>
        <h5>Published: &nbsp;{book.publishedYear}</h5>
      </div>
    </Fragment>
  );
};

export default BookDetails;
