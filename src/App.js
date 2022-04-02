import "./App.css";

import BookItem from "./components/BookItem";

const App = () => {
  const bookDate = new Date(2021, 7, 21);
  const bookTitle = "100 años de soledad";
  const bookAuthor = "Gabriel Garcia Marquez";
  const bookPageCount = 421;

  return (
    <div>
      <h2>Books Champion App</h2>
      <p>¡Quiero leer libros!</p>
      <BookItem
        title={bookTitle}
        dateRead={bookDate}
        author={bookAuthor}
        pageCount={bookPageCount}
      />
    </div>
  );
};

export default App;
