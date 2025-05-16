import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from './store';
import 'react-toastify/dist/ReactToastify.css';
import './Veg.css';
import './Footer.css';

const Veg = () => {
  const vegProducts = useSelector((state) => state.products.Veg);
  const dispatch = useDispatch();

  const priceRanges = [
    { value: '₹10 - ₹50', min: 10, max: 50 },
    { value: '₹51 - ₹100', min: 51, max: 100 },
    { value: '₹101 - ₹200', min: 101, max: 200 },
    { value: '₹201 - ₹500', min: 201, max: 500 },
    { value: '₹501 - ₹600', min: 501, max: 600 },
  ];

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleCheckboxChange = (selectedRange) => {
    const isAlreadySelected = selectedRanges.some(
      (range) => range.value === selectedRange.value
    );

    if (isAlreadySelected) {
      setSelectedRanges(selectedRanges.filter((range) => range.value !== selectedRange.value));
    } else {
      setSelectedRanges([...selectedRanges, selectedRange]);
    }
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const getFilteredItems = () => {
    if (selectedRanges.length === 0) return vegProducts;
    return vegProducts.filter((product) =>
      selectedRanges.some((range) => product.price >= range.min && product.price <= range.max)
    );
  };

  const getCountForRange = (range) => {
    return vegProducts.filter((product) => product.price >= range.min && product.price <= range.max).length;
  };

  const filteredItems = getFilteredItems();
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // TIMER
  const [timeLeft, setTimeLeft] = useState(22 * 3600 + 30 * 60 + 5);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <>
      <div className="veg-container1">
        <h2 className="veg-title animated-title">Veg Items 🥦</h2>

        <div className="offer-banner pulse-banner">
          {timeLeft > 0 ? (
            <>⏳ Hurry! Offer ends in: <span className="timer">{formatTime(timeLeft)}</span></>
          ) : (
            <span style={{ color: '#fff' }}>❌ Offer expired!</span>
          )}
        </div>

        {/* Filter Section */}
        <div className="filter-section fade-in">
          <h4 className="filter-title">Filter by Price Range:</h4>
          <div className="filter-checkboxes">
            {priceRanges.map((range, index) => (
              <label key={index} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRanges.some((r) => r.value === range.value)}
                  onChange={() => handleCheckboxChange(range)}
                />
                <span className="checkbox-label">{range.value}</span>
                <span className="items-left">({getCountForRange(range)} items)</span>
              </label>
            ))}
          </div>
          <button onClick={handleClearAll} className="clear-button">Clear All</button>
        </div>

        {/* Product Cards */}
        <div className="veg-items">
          {currentItems.length === 0 ? (
            <p>No items match the selected range.</p>
          ) : (
            currentItems.map((product, index) => (
              <div key={index} className="veg-item fade-in">
                <img src={product.image} alt={product.name} className="veg-image" />
                <h3 className="veg-name">{product.name}</h3>
                <p className="veg-price">₹{product.price}</p>
                <p className="veg-description">{product.description}</p>
                <button
                  onClick={() => {
                    dispatch(addToCart(product));
                    toast.success(`${product.name} added to cart!`);
                  }}
                  className="veg-button"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1} className="pagination-button-nav1">
              ◀ Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-button-nav2">
              Next ▶
            </button>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <ToastContainer position="bottom-left" autoClose={2000} />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <h3 className="footer-title"> 🧺 BigBasket - All Items Are Available Here!🙂</h3>
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

export default Veg;
