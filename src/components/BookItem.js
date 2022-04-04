import "./BookItem.css";

import ReadDate from "./ReadDate";
import BookCard from "./BookCard";

const BookItem = ({ author, title, dateRead, pageCount }) => {
  return (
    <BookCard className="book-item-container">
      <h2>{title}</h2>
      <h3>{author}</h3>
      <ReadDate dateRead={dateRead} />
      <p>{pageCount} páginas</p>
    </BookCard>
  );
};

export default BookItem;
