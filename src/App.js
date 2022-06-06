import React, { useCallback, useMemo, useState, Suspense } from "react";

import "./App.css";

import NewBook from "./components/books/new-book/NewBook";
import Login from "./components/auth/Login";

// REVIEW: 7. custom hook
import AuthContextProvider, { useAuth } from "./components/context/AuthContextProvider";
import SlowComponent, {MemoFastComponent, slowFn} from "./components/memoize/SlowComponent";

const DUMMY_BOOKS = [
  {
    id: 1,
    title: "100 años de soledad",
    author: "Gabriel García Marquez",
    dateRead: new Date(2021, 8, 12),
    pageCount: 410,
  },
  {
    id: 2,
    title: "Todos los fuegos el fuego",
    author: "Julio Cortazar",
    dateRead: new Date(2020, 6, 11),
    pageCount: 197,
  },
  {
    id: 3,
    title: "Asesinato en el Orient Express",
    author: "Agatha Christie",
    dateRead: new Date(2021, 5, 9),
    pageCount: 256,
  },
  {
    id: 4,
    title: "Las dos torres",
    author: "J.R.R Tolkien",
    dateRead: new Date(2020, 3, 22),
    pageCount: 352,
  },
];

const BooksLazy = React.lazy(() => import("./components/books/Books"))

const App = () => {
  const [books, setBooks] = useState(DUMMY_BOOKS);

  const bookAddedHandler = (bookData) => {
    const newBookArray = [bookData, ...books];
    setBooks(newBookArray);
  };


  // const auth = useContext(AuthContext);
  const auth = useAuth();
  const param = 'slow';
  const [ count, setCount ] = useState(0);

  const [ a, setA ] = useState(1);
  const [ b, setB ] = useState(2);
  // const slowValueSum = slowFn(a,b);
  const memoFastValue = useMemo(() => slowFn(a,b), [a,b]);
  const logger = useCallback((log) => console.log(log), []);
  return (
        
        <div>
          <h2>Books Champion App</h2>
          <p>¡Quiero leer libros!</p>
          { true && 
            <Suspense fallback={<div>Loading</div>}>
              <NewBook onBookAdded={bookAddedHandler} />
              <BooksLazy books={books} />
            </Suspense>
          }
          <button onClick={() => { 
            setCount(count + 1);
            if (count > 3) {
              setA(2);
            }
          }}>Re-render {count} // { memoFastValue }</button>
          <MemoFastComponent 
            value={count > 5 ? 're-renderizar' : param} 
            onLog={logger}
          />
          { !auth.currentUser && 
            <Login />
          }
        </div>
  );
};

export default App;

