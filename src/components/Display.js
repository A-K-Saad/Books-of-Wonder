import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import BookDetails from "./BookDetails";
import Cart from "./Cart";
// import Book from "./Book";

const Display = () => {
  const [search, setSearch] = useState("");
  const [getBooks, setgetBooks] = useState([]);
  const [totalBooksNumber, setTotalBooksNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);
  const [existQuantity, setExistQuantity] = useState(0);
  const [allDatas, setAllDatas] = useState([]);

  // FetchData
  const fetchData = async (search) => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${search}&limit=20`
    );
    const data = await response.json();
    setgetBooks(data.docs);
    setTotalBooksNumber(data.numFound);
    setLoading(false);
  };

  useEffect(() => {
    const topics = ["science", "programming", "harry_potter"];
    let randomTopic = topics[Math.floor(Math.random() * topics.length)];
    fetchData(randomTopic);
  }, []);

  //Handling submit
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    fetchData(search);
    showDetails && window.scrollTo(0, 600);
    setShowDetails(false);
  };

  // updating total

  const updateTotal = (book, increasing) => {
    getDatas(book, increasing);
    setAllDatas(storedData);
  };

  const emptyData = [];
  const storedData = JSON.parse(localStorage.getItem("data"));
  !storedData && localStorage.setItem("data", JSON.stringify(emptyData));

  //Getting Count data
  let previousData = JSON.parse(localStorage.getItem("data"));
  if (!previousData) {
    localStorage.setItem("data", emptyData);
  }

  const countData = previousData.map((single) => single.quantity);
  const count = countData.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  const showDetailFunction = (book) => {
    setLoading(true);
    setShowDetails(true);
    setBookDetails(book);
    window.scrollTo(0, 10);
    setLoading(false);
  };
  const getDatas = (book, increasing) => {
    const storing = {
      cover_i: book.cover_i,
      key: book.key,
      title: book.title,
      quantity: 1,
    };
    const exist = storedData.find((el) => el.key === book.key);
    if (exist) {
      setExistQuantity(exist.quantity);
      if (increasing) {
        exist.quantity = exist.quantity + 1;
      } else {
        if (exist.quantity > 1) {
          exist.quantity = exist.quantity - 1;
        }
      }
    } else {
      storedData.push(storing);
    }

    localStorage.setItem("data", JSON.stringify(storedData));
  };
  if (loading) {
    return <h1 className="text-center m-3 loading">Loading..</h1>;
  }

  const deleteItem = (key) => {
    const deleteing = storedData.indexOf(
      storedData.find((el) => el.key === key)
    );
    storedData.splice(deleteing, 1);
    localStorage.setItem("data", JSON.stringify(storedData));
    setAllDatas(storedData);
  };

  return (
    <>
      <header className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="container p-0">
            <a className="navbar-brand d-flex" href="/">
              <img src={logo} alt="" />
              <div className="nav-titles d-flex flex-column ps-2">
                <h3 className="title-first m-0">Books of</h3>
                <h3 className="m-0">Wonder</h3>
              </div>
            </a>

            <form
              className="input-group pb-4 pb-md-0 px-3 px-md-5"
              onSubmit={(event) => handleSubmit(event)}
            >
              <input
                type="text"
                className="input-filed"
                value={search}
                placeholder="Search by book and author name"
                onChange={(event) => setSearch(event.target.value)}
              />
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <button
              className="btn-cart nav-link p-0 position-relative top-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i className="fas fa-shopping-cart m-0 text-light"></i>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                id="counter"
              >
                {count}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>
        </nav>
      </header>

      <Cart updateTotal={updateTotal} deleteItem={deleteItem} data={allDatas} />

      <main className="container">
        {/* <h3 className="text-center mt-4">
          {`Showing:
          ${
            getBooks.filter(
              (book) => book.title && book.author_name && book.cover_i
            ).length
          }
          of ${totalBooksNumber}`}
        </h3> */}

        {/* Showing_Details */}

        {showDetails && <BookDetails {...bookDetails} />}

        <div className="row mt-5 mt-md-0">
          {getBooks
            .filter((book) => book.title && book.author_name && book.cover_i)
            .map((book) => (
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
            ))}
        </div>
        {/* {loading ? <h1 className="text-center m-3 loading">Loading..</h1> : ""} */}
      </main>
    </>
  );
};

export default Display;
