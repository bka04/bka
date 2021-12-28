import { useState } from "react";
import Card from "../UI/Card";
import BookList from "./BookList";
import BookDetails from "./BookDetails";
import classes from "./Books.module.css";

const BOOKS = [
  {
    id: "twiwu",
    title: "The World Is Waking Up",
    coverFile: "twiwu-cover.jpg",
    targetedAge: "Elementary/Middle School",
    descriptionLong:
      "<p>We thought we were great<br>At hide-and-go-seek<br>For we hadn't been found<br>In over a week.<br></p>" +
      "<p>But suddenly today,<br>We figured out why:<br>Everyone who played<br>Decided to hide.</p>" +
      "<p>So reads one of the seventy-nine children's poems in this collection. From short and sweet to two page adventures, <i>The World Is Waking Up</i>'s poems vary in length, tone, and form. Meet characters like Long-legged Lucy, waiting Willie, and exuberant, effervescently expressive Ed as you enjoy playful illustrations that accompany each poem.</p>",
    amazonURL:
      "https://www.amazon.com/World-Waking-Up-Brent-Aronsen/dp/1090354916/",
    publishedYear: 2019,
    pageCount: 108,
  },
  {
    id: "amu",
    title: "All Mixed Up",
    coverFile: "amu-cover.jpg",
    targetedAge: "Elementary",
    descriptionLong:
      "<p>She thought a smile was a frown<br>And the sky was the ground.<br>But, in her defense,<br>It all made sense<br>'Cause she was hanging upside down.</p>" +
      "<p>This playful collection of twenty-seven limericks is sure to delight both young children and adults alike. Best read aloud, poems cover a variety of topics related to kids and their activities. Each poem is complete with a full page watercolor illustration. From light-hearted rebelliousness to bits of advice, there is something for everyone!</p>",
    amazonURL:
      "https://www.amazon.com/All-Mixed-Up-Collection-Limericks/dp/1494414708",
    publishedYear: 2014,
    pageCount: 32,
  },
  {
    id: "afs",
    title: "Animal Fashion Show",
    coverFile: "afs-cover.jpg",
    targetedAge: "Elementary",
    descriptionLong: 
      "<p>All of the animals go,<br>But these birds steal the show.<br>They waddle like ducks<br>But look good in a tux;<br>Fashion is what penguins know!<br>" +
      "<p><i>Animal Fashion Show</i> is a collection of twenty-nine poems about all of your favorite animals! Each poem is beautifully illustrated with vibrant watercolors, making this book a joy for kids and adults alike.</p>",
    amazonURL: "https://www.amazon.com/gp/product/1505485991/",
    publishedYear: 2015,
    pageCount: 32,
  },
  {
    id: "yoga",
    title: "Yoga Poems For the Rest of Us",
    coverFile: "yoga-cover.jpg",
    targetedAge: "Yogis of all ages!",
    descriptionLong:
      "<p>I did your sequence in order -<br>Each pose five breaths, no shorter.<br>But it seemed that half moon<br>Came rather soon,<br>And mine looked like a quarter!</p>" +
      "<p>We've all been there. The yogi next to us executes each pose flawlessly while we barely make it through class alive. This humorous book highlights our struggles with thirty poses, each with its own poem and descriptive illustration!<p>",
    amazonURL: "https://www.amazon.com/gp/product/1502383462/",
    border: true,
    publishedYear: 2014,
    pageCount: 63,
  },
];

const Author = (props) => {
  const [selectedBookId, setSelectedBookId] = useState(BOOKS[0].id);

  const bookSelectHandler = (bookId) => {
    setSelectedBookId(bookId);
  };

  const findBook = (selectedID) => {
    return (BOOKS.find((bookObj) => {
      return bookObj.id === selectedID;
    }));
  }

  return (
    <div className={classes.mainContainer}>
      <Card>
        <BookDetails
          book={findBook(selectedBookId)}
          key={findBook(selectedBookId).id}
        />
      </Card>
      <Card>
        <BookList
          books={BOOKS}
          selectedBookId={selectedBookId}
          onBookSelect={bookSelectHandler}
        />
      </Card>
    </div>
  );
};

export default Author;
