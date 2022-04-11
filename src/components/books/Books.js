import "./Books.css";

import BookItem from "./BookItem";

const Books = ({ books, children }) => {
  return (
    <div className="books-container">
      <BookItem
        title={books[0].title}
        dateRead={books[0].dateRead}
        author={books[0].author}
        pageCount={books[0].pageCount}
      />
      <BookItem
        title={books[1].title}
        dateRead={books[1].dateRead}
        author={books[1].author}
        pageCount={books[1].pageCount}
      />
      <BookItem
        title={books[2].title}
        dateRead={books[2].dateRead}
        author={books[2].author}
        pageCount={books[2].pageCount}
      />
      <BookItem
        title={books[3].title}
        dateRead={books[3].dateRead}
        author={books[3].author}
        pageCount={books[3].pageCount}
      />
    </div>
  );
};

export default Books;
