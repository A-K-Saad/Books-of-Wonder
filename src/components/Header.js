import React from "react";
import logo from "../images/logo.png";

const Navbar = ({ handleSubmit, search, setSearch, count }) => {
  return (
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
  );
};

export default Navbar;
