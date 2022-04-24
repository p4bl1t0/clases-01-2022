import "./Books.css";

import BookItem from "./BookItem";
import { useState } from "react";
import BooksFilter from "../filter/BookFilter";

const Books = ({ books, children }) => {
  const [selectedYear, setSelectedYear] = useState("2021");

  const onYearChanged = (newYear) => {
    setSelectedYear(newYear);
  };

  return (
    <div>
      <BooksFilter onYearChanged={onYearChanged} year={selectedYear} />
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
    </div>
  );
};

export default Books;
