import React from "react";

const BookDetails = (book) => {
  const { cover_i, title, author_name, first_publish_year } = book;
  return (
    <div>
      <div className="row my-5 px-5 py-4 details-container">
        <div className="col-12 col-md-4 cover-container">
          <img
            src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}
            alt={cover_i}
            className="details-cover"
          />
        </div>
        <div className="col-12 col-md-8 text-justify d-flex flex-column justify-content-center">
          {title.length > 25 ? (
            <h4 className="book-name">{title}</h4>
          ) : (
            <h1 className="book-name">{title}</h1>
          )}
          {/* Book Author */}
          {title.length > 25 ? (
            <h5 className="author-name pt-2">By {author_name}</h5>
          ) : author_name.length > 1 ? (
            <h6 className="author-name pt-2">By {author_name}</h6>
          ) : (
            <h3 className="author-name pt-2">By {author_name}</h3>
          )}
          {/* Book published */}

          {first_publish_year ? (
            <h6 className="text-secondary">
              Published in{" "}
              <span className="text-primary">{first_publish_year}</span>
            </h6>
          ) : (
            ""
          )}
          <h3>
            ${" "}
            {book.title.length > 20
              ? book.title.slice(19).length * 5
              : book.title.length * 6}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
