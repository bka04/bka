import classes from './BookDetails.module.css';

const BookDetails = (props) => {
  return (
    <div className={classes.bookDetails}>
      <a href={props.book.amazonURL} target="_blank" rel="noreferrer">{`Buy ${props.book.title} on Amazon!`}</a>
    </div>
  )
}

export default BookDetails;