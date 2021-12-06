

const BookDetails = (props) => {
  return (
    <div>
      <a href={props.book.amazonURL} target="_blank" rel="noreferrer">{`Buy ${props.book.title} on Amazon!`}</a>
    </div>
  )
}

export default BookDetails;