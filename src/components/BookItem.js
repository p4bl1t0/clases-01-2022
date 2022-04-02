import "./BookItem.css";

const BookItem = ({ author, title, dateRead, pageCount }) => {
  return (
    <div className="book-item-container">
      <h2>{title}</h2>
      <h3>{author}</h3>
      <div>{dateRead.toString()}</div>
      <p>{pageCount} páginas</p>
    </div>
  );
};

export default BookItem;
