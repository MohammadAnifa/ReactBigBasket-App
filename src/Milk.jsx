import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Milk.css';
import './Footer.css';

const ITEMS_PER_PAGE = 4;

const Milk = () => {
  const dispatch = useDispatch();
  const milkProducts = useSelector((state) => state.products.milk);

  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilters, setPriceFilters] = useState({
    '10-50': false,
    '51-100': false,
    '101-200': false,
    '201-500': false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState(22 * 3600 + 30 * 60 + 5); // 22h 30m 5s

  useEffect(() => {
    setCurrentPage(1);
  }, [priceFilters, searchQuery]);

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

  const handlePriceFilterChange = (range) => {
    setPriceFilters((prev) => ({
      ...prev,
      [range]: !prev[range],
    }));
  };

  const handleClearAll = () => {
    setPriceFilters({
      '10-50': false,
      '51-100': false,
      '101-200': false,
      '201-500': false,
    });
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: 'top-right',
      autoClose: 1500,
      theme: 'colored',
    });
  };

  const filteredProducts = milkProducts.filter((product) => {
    const searchMatch =
      searchQuery === '' ||
      (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);

    const selectedRanges = Object.keys(priceFilters).filter((range) => priceFilters[range]);
    const priceMatch =
      selectedRanges.length === 0 ||
      selectedRanges.some((range) => {
        const [min, max] = range.split('-').map(Number);
        return product.price >= min && product.price <= max;
      });

    return searchMatch && priceMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="milk-container">
        <h2>Milk Products 🥛</h2>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search milk products... 🔍"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search milk products"
          />
        </div>

        <div className="offer-banner">
          {timeLeft > 0 ? (
            <>⏳ Hurry! Offer ends in: <span className="timer">{formatTime(timeLeft)}</span></>
          ) : (
            <span style={{ color: '#fff' }}>❌ Offer expired!</span>
          )}
        </div>

        <div className="content-wrapper">
          {/* 💰 Price Filter Sidebar */}
          <div className="sidebar">
            <h3>PRICE FILTER</h3>
            <div className="filter-section">
              {Object.keys(priceFilters).map((range) => (
                <label key={range} className="filter-label">
                  <input
                    type="checkbox"
                    checked={priceFilters[range]}
                    onChange={() => handlePriceFilterChange(range)}
                    aria-label={`Filter by price range ${range}`}
                  />
                  {range}
                </label>
              ))}
            </div>
            <button
              onClick={handleClearAll}
              disabled={
                Object.values(priceFilters).every((v) => !v) && searchQuery === ''
              }
              className="clear-all-btn"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>

          {/* 🧺 Milk Product Cards */}
          <div className="milk-items">
            {currentItems.length > 0 ? (
              <div className="milk-row">
                {currentItems.map((product) => (
                  <div key={product.name} className="milk-item">
                    <img
                      src={`http://localhost:4040${product.imagepath}`}
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                      alt={product.name}
                      className="milk-image"
                    />
                    <h3 className="milk-name">{product.name}</h3>
                    <p className="milk-price">₹{product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="add-to-cart-btn"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      ADD TO CART 🛒
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products match the selected filters or search query.</p>
            )}
          </div>
        </div>

        {/* 📄 Pagination */}
        {filteredProducts.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button pagination-button-prev"
              aria-label="Previous page"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`pagination-button pagination-button-number ${
                  currentPage === i + 1 ? 'active' : ''
                }`}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button pagination-button-next"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* 🔔 Toasts */}
      <ToastContainer />

      {/* 🦶 Footer */}
      <footer className="footer">
        <div className="footer-top">
          <h3 className="footer-title">🧺 BigBasket - All Items Are Available Here! 🙂</h3>
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

export default Milk;