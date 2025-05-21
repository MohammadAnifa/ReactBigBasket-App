import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Veg.css";
import "./Footer.css";

const Veg = () => {
  const dispatch = useDispatch();
  const allVegItems = useSelector((state) => state.products.Veg);

  const [filteredVegItems, setFilteredVegItems] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [timer, setTimer] = useState(22 * 3600 + 29 * 60 + 6); // 23h 30m 6s

  const itemsPerPage = 4;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    let filtered = [...allVegItems];

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((item) => {
        return selectedPrices.some((priceRange) => {
          if (priceRange === "0-30") return item.price >= 0 && item.price <= 30;
          if (priceRange === "31-60") return item.price >= 31 && item.price <= 60;
          if (priceRange === "61-100") return item.price >= 61 && item.price <= 100;
          if (priceRange === "100+") return item.price > 100;
          return false;
        });
      });
    }

    setFilteredVegItems(filtered);
    setCurrentPage((prev) => {
      const newTotalPages = Math.ceil(filtered.length / itemsPerPage);
      return prev > newTotalPages ? 1 : prev;
    });
  }, [allVegItems, selectedPrices]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVegItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVegItems.length / itemsPerPage);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrices((prev) => [...prev, value]);
    } else {
      setSelectedPrices((prev) => prev.filter((v) => v !== value));
    }
  };

  const clearFilters = () => {
    setSelectedPrices([]);
  };

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours}h ${minutes}min ${seconds}sec`;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="veg-container">
      <h1 className="veg-title">Fresh Vegetables</h1>

      <div className="filter-section">
        <h2 className="filter-title">Price</h2>
        <div className="filter-checkboxes">
          {["0-30", "31-60", "61-100", "100+"].map((range) => (
            <label key={range} className="filter-checkbox">
              <input
                type="checkbox"
                value={range}
                checked={selectedPrices.includes(range)}
                onChange={handleCheckboxChange}
              />
              <span className="checkbox-label">{range}</span>
            </label>
          ))}
          <button onClick={clearFilters} disabled={selectedPrices.length === 0}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="offer-banner">
        Limited Time Offer: Flat 20% Off! <span className="timer">⏰ {formatTime(timer)}</span>
      </div>

      <div className="veg-products-section">
        {currentItems.length === 0 ? (
          <p style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
            No vegetables match the selected filter range.
          </p>
        ) : (
          currentItems.map((veg, index) => (
            <div key={index} className="veg-item">
              <img src={veg.image} alt={veg.name} className="veg-image" />
              <p className="veg-price">₹{veg.price}</p>
              <p className="veg-description">{veg.description}</p>
              <h3 className="veg-name">{veg.name}</h3>
              <button
                className="veg-button"
                onClick={() => {
                  dispatch(addToCart(veg));
                  toast.success(`${veg.name} added to cart!`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "colored",
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      <div className="pagination-btn">
        <button className="pagination-button1" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pagination-number ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className="pagination-button2" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <h3 className="footer-title"> 🧺 BigBasket - All Items Are Available Here! 🙂</h3>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/orders">Orders</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-socials">
            <i className="fab fa-facebook-f" aria-label="Facebook"></i>
            <i className="fab fa-instagram" aria-label="Instagram"></i>
            <i className="fab fa-youtube" aria-label="YouTube"></i>
          </div>
          <p className="footer-copy">© 2025 FoodsZone. All Rights Reserved By Ashvita Kapat</p>
        </div>
      </footer>
    </div>
  );
};

export default Veg;
