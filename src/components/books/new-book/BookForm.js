import React, { useEffect, useRef, useState } from "react";

import "./BookForm.css";
import Rating from "./Rating";

const categories = [
  { id: 1, name: 'Ficción' },
  { id: 2, name: 'No ficción' }
];

const subcategories = [
  { id: 1, name: 'Novela', categoryId: 1 },
  { id: 2, name: 'Cuento', categoryId: 1 },
  { id: 3, name: 'Poesía', categoryId: 1 },
  { id: 4, name: 'Biografía', categoryId: 2 },
  { id: 5, name: 'Ensayo', categoryId: 2 },
  { id: 6, name: 'Historia', categoryId: 2 }
];

let previousValue = false;

const BookForm = ({ onBookDataSaved }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [readDate, setReadDate] = useState("");
  const [readStatus, setReadStatus] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const [subCategoriesFiltered, setSubCategoriesFiltered] = useState([]);
  const reviewRef = useRef(null);
  const [errors, setErrors] = useState(null);
  const [bookSugestions, setBookSugestions] = useState(null);
  const [bookSelected, setBookSelected] = useState(false);



  useEffect(() => {
    // cada vez que se actualiza el valor de status

    if (readStatus === 'read_it') {
      reviewRef.current.focus();
    }
  }, [readStatus]);

  useEffect(() => {
    if (title || author || readDate) {
      setErrors(validate(generateBookObject()));
    }
  }, [title, author, readDate]);

  useEffect(() => {
    if (title && title.length > 3) {
      console.log('title change', previousValue, title);
      const bookFetch = () => {
        let apiTitle = title;
        apiTitle = apiTitle.replace(/\s+/gi, '+'); 
        console.log('valor', apiTitle);
    
        fetch('http://openlibrary.org/search.json?q=' + apiTitle)
        .then(response => response.json()) 
        .then(data => {
          console.log('book data', data);
          setBookSugestions(data.docs);
        }).catch((err) => {
          // reject
          // errores then function
        });
      }
      previousValue  = title;

      setTimeout(() => {
        if (previousValue === title && !bookSelected) {
          bookFetch();
        } else {
          // el valor está cambiando
        }
      }, 1000);


    }
  }, [title, bookSelected])

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);

    
  };

  const changeAuthorHandler = (event) => {
    console.log('author change', event.target.value);
    setAuthor(event.target.value);
  };

  const changePageCountHandler = (event) => {
    setPageCount(event.target.value);
  };

  const changeReadDateHandler = (event) => {
    setReadDate(event.target.value);
  };

  const changeStatusHandler = (event) => {
    setReadStatus(event.target.value);
  };
  const changeReadingProgressHandler = (event) => {
    setReadingProgress(event.target.value);
  };
  const changeReviewHandler = (event) => {
    setReview(event.target.value);
  };
  const changeRatingHandler = (value) => {
    setRating(value);
  }; 

  const changeCategoryHandler = (event) => {
    if (event.target.value) {
      setSubCategoriesFiltered(subcategories.filter(s => s.categoryId == event.target.value));
    }
    setCategory(event.target.value);
    // 
  };
  const changeSubCategoryHandler = (event) => {
    setSubCategory(event.target.value);
  };

  const validationRequirements = {
    title: { required: true, minLength: 3 },
    author: { required: true },
    readDate: { required: true, isDate: true }
  }


  const validate = (bookObject) => {
    let errors = {};
    if (bookObject) {
      Object.keys(validationRequirements).forEach((key) => {
        if (validationRequirements[key].required && !bookObject[key]) {
          errors[key] = 'El campo es obligatorio.';
        } else if (validationRequirements[key].minLength > 0 && bookObject[key].length < validationRequirements[key].minLength) {
          errors[key] = 'El campo debe terner al menos ' + validationRequirements[key].minLength + ' caracteres.';
        }
      });
    }
    return errors;
  }

  const generateBookObject = () => {
    const bookData = {
      title,
      author,
      pageCount,
      dateRead: new Date(readDate),
      readStatus,
      readingProgress,
      review,
      rating
    };
    return bookData;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const bookData = generateBookObject();
    const errors = validate(bookData);
    // errors = { author: 'El campo debe estar completo' }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    onBookDataSaved(bookData);
    // fetch('url servidor', { method: 'POST' })
    setTitle("");
    setAuthor("");
    setPageCount("");
    setReadDate("");
    setReadingProgress(0);
    setReview('');
    setRating(0);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-book-controls">
        <div className="new-book-control">
          <label>Título</label>
          <input list="book-suggestion" value={title} onChange={changeTitleHandler} type="text" />

          { errors?.title &&
            <div className="red">{ errors.title }</div>
          }
          { !bookSelected && bookSugestions?.length > 0 && 
            <datalist id="book-suggestion">
              {
                bookSugestions.map((item, index) => (
                  <option key={index} onClick={() => {
                    setTitle(item.title);
                    setBookSelected(true);
                  }} value={item.title}>{ item.title }</option>
                ))

              }
            </datalist>
          }
        </div>
        <div className="new-book-control">
          <label>Autor</label>
          <input value={author} onChange={changeAuthorHandler} type="text" onBlur={(event) => {
            setErrors(validate(generateBookObject()))
          }} />
          { errors?.author &&
            <div className="red">{ errors.author }</div>
          }
        </div>
        <div className="new-book-control">
          <label>Páginas</label>
          <input
            value={pageCount}
            onChange={changePageCountHandler}
            type="number"
            min="1"
            step="1"
          />
        </div>
        <div className="new-book-control">
          <label>¿Cuándo terminaste de leerlo?</label>
          <input
            value={readDate}
            onChange={changeReadDateHandler}
            type="date"
            min="2019-01-01"
            max="2022-12-31"
          />
        </div>
        <div className="new-book-control">
          <label>Categoría</label>
          <select value={category} onChange={changeCategoryHandler}>
            <option value="">- Seleccione una opción --</option>
            { categories.map((item, index) => (
              <option key={item.id} value={item.id}>{ item.name }</option>
            ))}
          </select>
        </div>
        <div className="new-book-control">
          <label>Subctategoría</label>
          <select value={subCategory} onChange={changeSubCategoryHandler}>
            <option value="">- Seleccione una opción --</option>
            { subCategoriesFiltered.map((item, index) => (
              <option key={item.id}>{ item.name }</option>
            ))}
          </select>
        </div>
      </div>
      <div className="new-book-inline-control">
          <label>
            <input type="radio" value="want_to_read" name="book_status" onChange={changeStatusHandler} /> <span>Quiero leerlo</span>
          </label>
          <label>
            <input type="radio" value="reading" name="book_status" onChange={changeStatusHandler} /> 
            <span>Lo estoy leyendo</span>
          </label>
          <label>
            <input type="radio" value="read_it" name="book_status" onChange={changeStatusHandler} /> 
            <span>Terminé de leerlo</span>
          </label>
      </div>
      { readStatus === 'reading' &&
        <div className="new-book-inline-control">
            <label htmlFor="reading_progress">Progreso de lectura: </label>
            <input type="range" id="reading_progress" min="0" max="100" step="10" value={readingProgress} onChange={changeReadingProgressHandler} />
            <span>{ readingProgress }%</span>
        </div>
      }
      { readStatus === 'read_it' &&
        <Rating 
          value={rating}
          onChange={changeRatingHandler}
          className={'book-form-rating'}
        />
      }
      { readStatus === 'read_it' &&
        <div className="new-book-control">
            <label htmlFor="review">Crítica del libro</label>
            <textarea 
              id="review" 
              ref={reviewRef} 
              value={review} 
              onChange={changeReviewHandler}
            ></textarea>
        </div>
      }
      <div className="new-book-actions">
        <button type="submit">Agregar lectura</button>
      </div>
    </form>
  );
};

export default BookForm;
