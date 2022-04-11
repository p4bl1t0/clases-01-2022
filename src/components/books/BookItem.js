import { useState } from "react";

import "./BookItem.css";

import ReadDate from "./ReadDate";
import BookCard from "../ui/BookCard";

const BookItem = ({ author, title, dateRead, pageCount }) => {
  const [newTitle, setNewTitle] = useState(title);
  // newTitle = title = "Nombre del libro"
  //
  //  const [a,b] = [1,2];
  // const newState = [...state];
  //   newState[0] = updatedTitle
  //  return newState
  // a = 1
  // b = 2

  const clickHandler = () => {
    console.log("Clicked!!");
    setNewTitle("Actualizado!!");
  };

  return (
    <BookCard className="book-item-container">
      <h2>{newTitle}</h2>
      <h3>{author}</h3>
      <ReadDate dateRead={dateRead} />
      <p>{pageCount} páginas</p>
      <button onClick={clickHandler}>Clickeame!!</button>
    </BookCard>
  );
};

export default BookItem;
