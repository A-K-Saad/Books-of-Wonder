import React from "react";

const Cart = ({ updateTotal, deleteItem, data }) => {
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Checkout your cart</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <hr />
      <div className="offcanvas-body">
        {data.map((singleData) => {
          const { title, cover_i, key, quantity } = singleData;
          return (
            <div
              className="col-12 p-2 border my-2 text-center d-flex justify-content-between"
              key={key}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}
                  alt={cover_i}
                  className="cart-img"
                />
                {title.length > 20 ? (
                  <p className="m-0 ps-3">{title.slice(0, 10)}...</p>
                ) : (
                  <p className="m-0 ps-4">{title}</p>
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center px-2">
                <button
                  className="btn btn-gray text-light"
                  onClick={() => updateTotal(singleData, true)}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <h6 className="m-0 px-2">{quantity}</h6>
                <button
                  className="btn btn-gray text-light"
                  onClick={() => updateTotal(singleData, false)}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <button
                  className="btn btn-danger ms-3"
                  onClick={() => deleteItem(key)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
