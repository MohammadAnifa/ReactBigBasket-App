import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './NonVeg.css';
import './Footer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 4;

const NonVeg = () => {
  const nonVegProducts = useSelector((state) => state.products.nonVeg);
  const dispatch = useDispatch();

  const priceRanges = [
    { label: '₹10 - ₹50', min: 10, max: 50 },
    { label: '₹51 - ₹100', min: 51, max: 100 },
    { label: '₹101 - ₹200', min: 101, max: 200 },
    { label: '₹201 - ₹500', min: 201, max: 500 },
    { label: '₹501 - ₹600', min: 501, max: 600 },
  ];

  const [priceFilter, setPriceFilter] = useState(10);
  const [timeLeft, setTimeLeft] = useState(22 * 3600 + 30 * 60 + 5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const currentRange = priceRanges.find(
    (range) => priceFilter >= range.min && priceFilter <= range.max
  );

  const filteredItems = nonVegProducts.filter((item) => item.price >= priceFilter);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="nonveg-container">
        <h2>Non-Veg Products 🍗</h2>

        <div className="offer-banner">
          {timeLeft > 0 ? (
            <>⏳ Hurry! Offer ends in: <span className="timer">{formatTime(timeLeft)}</span></>
          ) : (
            <span style={{ color: '#fff' }}>❌ Offer expired!</span>
          )}
        </div>

        <div className="price-filter-section">
          <h4>
            Filtering items from ₹{priceFilter}
            {currentRange ? ` (Range: ${currentRange.label})` : ''}
          </h4>
          <input
            type="range"
            min="10"
            max="600"
            step="1"
            value={priceFilter}
            onChange={(e) => {
              setPriceFilter(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="price-slider"
          />
        </div>

        <div className="nonveg-items">
          {currentItems.length === 0 ? (
            <p>No items found at or above ₹{priceFilter}.</p>
          ) : (
            currentItems.map((product) => (
              <div key={product.name} className="nonveg-item">
                <img src={product.image} alt={product.name} className="nonveg-image" />
                <h3 className="nonveg-name">{product.name}</h3>
                <p className="nonveg-price">₹{product.price}</p>
                <p className="nonveg-description">{product.description}</p>
                <button
                  onClick={() => {
                    dispatch(addToCart(product));
                    toast.success(`${product.name} added to cart!`, {
                      position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "colored",
                  });
                }}
                  className="nonveg-button"
                >
                  Add To Cart 🛒
                </button>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button3"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Toast Notification */}
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
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
          <p className="footer-copy">© 2025 FoodsZone. All Rights Reserved By Ashvita Kapat</p>
        </div>
      </footer>
    </>
  );
};

export default NonVeg;
