import React from "react";

const SingleBook = ({ books, showDetailFunction, updateTotal }) => {
  return (
    <>
      {books
        .filter((book) => book.title && book.author_name && book.cover_i)
        .map((book) => {
          return (
            <div
              className="col-12 col-md-3 col-lg-2 p-4 p-md-2 mx-auto position-relative"
              key={book.key}
            >
              <div className="p-4 p-md-2 single-book shadow bg-light">
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.cover_i}
                  className="book-cover"
                />
                <h5 className="book-title pt-2 text-center">
                  {book.title.length > 13
                    ? book.title.slice(0, 12) + `...`
                    : book.title}
                </h5>
                <h3 className="text-center book-price">
                  $
                  {book.title.length > 20
                    ? book.title.slice(19).length * 5
                    : book.title.length * 6}
                </h3>
                <button
                  className="info-btn"
                  onClick={() => showDetailFunction(book)}
                >
                  <i className="fas fa-list"></i>
                </button>
                <button
                  className="cart-btn top-0"
                  onClick={() => updateTotal(book, true)}
                >
                  <i className="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default SingleBook;
