import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [getBooks, setgetBooks] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${search}&limit=20`
    );
    const data = await response.json();
    setgetBooks(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    setgetBooks();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light p-0">
        <div className="container p-0">
          <a className="navbar-brand d-flex" href="/">
            <img src={logo} alt="" />
            <div className="nav-titles d-flex flex-column ps-2">
              <h3 className="title-first m-0">Books of</h3>
              <h3 className="m-0">Wonder</h3>
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <form
            className="input-group ps-3"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              type="text"
              className="input-filed"
              placeholder="Search by book and author name"
              onChange={(event) => setSearch(event.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <button className="nav-link p-0 position-relative">
                <i className="fas fa-shopping-cart h3 m-0"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  1<span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
