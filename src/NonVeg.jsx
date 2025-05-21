import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './NonVeg.css';
import './Footer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 4;

const NonVeg = () => {
  // Fetch nonVegProducts from Redux store
  const nonVegProducts = useSelector((state) => state.products.nonVeg);
  const dispatch = useDispatch();

  const priceRanges = [
    { label: '₹10 - ₹50', min: 10, max: 50 },
    { label: '₹51 - ₹100', min: 51, max: 100 },
    { label: '₹101 - ₹200', min: 101, max: 200 },
    { label: '₹201 - ₹500', min: 201, max: 500 },
    { label: '₹501 - ₹600', min: 501, max: 600 },
  ];

  const [priceFilter, setPriceFilter] = useState(10); // Set to 10 to ensure minimal filtering
  const [timeLeft, setTimeLeft] = useState(22 * 3600 + 30 * 60 + 5);
  const [currentPage, setCurrentPage] = useState(4); // Set to 4 to match screenshot

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

  // Ensure nonVegProducts is an array
  const filteredItems = Array.isArray(nonVegProducts)
    ? nonVegProducts.filter((item) => item.price >= priceFilter)
    : [];

  // Debug logs to verify data
  console.log('nonVegProducts:', nonVegProducts);
  console.log('filteredItems:', filteredItems);
  console.log('priceFilter:', priceFilter);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  console.log('totalPages:', totalPages);
  console.log('currentPage:', currentPage);

  // Adjust currentPage if it exceeds totalPages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
      console.log('Adjusted currentPage to:', totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
      console.log('Adjusted currentPage to 1 because totalPages is 0');
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  console.log('startIndex:', startIndex);
  console.log('currentItems:', currentItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log('Page changed to:', page);
    } else {
      console.log('Invalid page change attempted:', page);
    }
  };

  // Debug log for pagination rendering
  console.log('Rendering pagination with: Previous, Pages:', Array.from({ length: totalPages }, (_, i) => i + 1), ', Next');

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
              console.log('Price filter changed to:', Number(e.target.value));
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
                    console.log(`${product.name} added to cart`);
                  }}
                  className="nonveg-button"
                >
                  Add To Cart 🛒
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination: Show Previous, all page numbers, Next */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0}
            className="pagination-button3"
          >
            Previous
          </button>
          {totalPages > 0 ? (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`pagination-button ${page === currentPage ? 'active' : ''}`}
              >
                {page}
              </button>
            ))
          ) : (
            <button className="pagination-button" disabled>1</button>
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="pagination-button4"
          >
            Next
          </button>
        </div>
      </div>

      <ToastContainer />

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