import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './store';
import './Chocolate.css';
import './Footer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chocolate = () => {
  const chocolateProducts = useSelector((state) => state.products.chocolates);
  const dispatch = useDispatch();

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Price filter state (single slider for max price, up to ₹600)
  const [maxPrice, setMaxPrice] = useState(600);

  // Filter products based on search query and max price
  const filteredProducts = chocolateProducts.filter((product) => {
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch = product.price <= maxPrice;
    return searchMatch && priceMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Timer setup
  const [timeLeft, setTimeLeft] = useState(22 * 3600 + 30 * 60 + 5);

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

  // Adjust current page if filtered results change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
    if (filteredProducts.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredProducts, currentPage, totalPages]);

  const handlePriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleClearAll = () => {
    setMaxPrice(600); // Reset to ₹600
    setSearchQuery('');
    setCurrentPage(1); // Reset to first page after clearing filters
  };

  return (
    <>
      <div className="chocolate-container">
        <h2>Chocolate Products 🍬</h2>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search chocolate items... 🔍"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
            aria-label="Search chocolate items"
          />
        </div>

        <div className="offer-banner">
          {timeLeft > 0 ? (
            <>
              ⏳ Hurry! Offer ends in: <span className="timer">{formatTime(timeLeft)}</span>
            </>
          ) : (
            <span style={{ color: '#fff' }}>❌ Offer expired!</span>
          )}
        </div>

        <div className="content-wrapper">
          {/* 💰 Price Filter Sidebar */}
          <div className="sidebar">
            <div className="filter-card">
              <h3>PRICE FILTER</h3>
              <div className="filter-section">
                <h4>Filtering items up to ₹{maxPrice}</h4>
                <div className="filter-slider">
                  <input
                    type="range"
                    name="maxPrice"
                    min="10"
                    max="600"
                    value={maxPrice}
                    onChange={handlePriceChange}
                    aria-label="Maximum price filter"
                  />
                </div>
                <button
                  onClick={handleClearAll}
                  disabled={maxPrice === 600 && searchQuery === ''}
                  className="clear-all-btn"
                  aria-label="Clear all filters"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* 🍬 Chocolate Product Cards */}
          <div className="chocolate-items">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <div key={product.name} className="chocolate-item">
                  <img
                    src={`http://localhost:4040${product.imagepath}`}
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                    alt={product.name}
                    className="chocolate-image"
                  />
                  <h3 className="chocolate-name">{product.name}</h3>
                  <p className="chocolate-price">₹{product.price}</p>
                  <button
                    onClick={() => {
                      dispatch(addToCart(product));
                      toast.success(`${product.name} added to cart!`, {
                        position: 'top-right',
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        theme: 'colored',
                      });
                    }}
                    className="add-to-cart-btn"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add To Cart 🛒
                  </button>
                </div>
              ))
            ) : (
              <p className="no-products-message">No such products are available.</p>
            )}
          </div>
        </div>

        {filteredProducts.length > 0 && (
          <div className="pagination">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="pagination-button pagination-button-prev"
              aria-label="Previous page"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`pagination-button pagination-button-number ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="pagination-button pagination-button-next"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <ToastContainer />

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-top">
          <h3 className="footer-title">🧺 BigBasket- All Items Are Available Here!🙂</h3>
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

export default Chocolate;