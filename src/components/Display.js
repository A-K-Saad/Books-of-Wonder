import React, { useEffect, useState } from "react";
import BookDetails from "./BookDetails";
import Cart from "./Cart";
import SingleBook from "./SingleBook";
import Header from "./Header";

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
      `https://openlibrary.org/search.json?q=${search}&limit=35`
    );
    const data = await response.json();
    setgetBooks(data.docs);
    setTotalBooksNumber(data.numFound);
    setLoading(false);
  };

  useEffect(() => {
    setShowDetails(false);
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
      <Header
        handleSubmit={handleSubmit}
        search={search}
        setSearch={setSearch}
        count={count}
      />

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
          <SingleBook
            books={getBooks}
            showDetailFunction={showDetailFunction}
            updateTotal={updateTotal}
          />
        </div>
        {/* {loading ? <h1 className="text-center m-3 loading">Loading..</h1> : ""} */}
      </main>
    </>
  );
};

export default Display;
