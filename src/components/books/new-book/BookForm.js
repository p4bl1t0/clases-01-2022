import { useState } from "react";

import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [readDate, setReadDate] = useState("");

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const changeAuthorHandler = (event) => {
    setAuthor(event.target.value);
  };

  const changePageCountHandler = (event) => {
    setPageCount(event.target.value);
  };

  const changeReadDateHandler = (event) => {
    setReadDate(event.target.value);
  };

  return (
    <form>
      <div className="new-book-controls">
        <div className="new-book-control">
          <label>Título</label>
          <input onChange={changeTitleHandler} type="text" />
        </div>
        <div className="new-book-control">
          <label>Autor</label>
          <input onChange={changeAuthorHandler} type="text" />
        </div>
        <div className="new-book-control">
          <label>Páginas</label>
          <input
            onChange={changePageCountHandler}
            type="number"
            min="1"
            step="1"
          />
        </div>
        <div className="new-book-control">
          <label>¿Cuándo terminaste de leerlo?</label>
          <input
            onChange={changeReadDateHandler}
            type="date"
            min="2019-01-01"
            max="2022-12-31"
          />
        </div>
      </div>
      <div className="new-book-actions">
        <button type="submit">Agregar lectura</button>
      </div>
    </form>
  );
};

export default BookForm;
