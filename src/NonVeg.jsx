import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchProducts } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NonVeg.css';
import './Footer.css';

const ITEMS_PER_PAGE = 4;

const NonVeg = () => {
  const dispatch = useDispatch();
  const { nonVeg, loading, error } = useSelector((state) => state.products);

  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState(22 * 3600 + 30 * 60 + 5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let filtered = [...nonVeg];

    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((item) =>
        selectedPrices.some((range) => {
          if (range === '10-50') return item.price >= 10 && item.price <= 50;
          if (range === '51-100') return item.price >= 51 && item.price <= 100;
          if (range === '101-200') return item.price >= 101 && item.price <= 200;
          if (range === '201-500') return item.price >= 201 && item.price <= 500;
          if (range === '501-600') return item.price >= 501 && item.price <= 600;
          return false;
        })
      );
    }

    setFilteredItems(filtered);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    setCurrentPage((prev) => (prev > totalPages && totalPages > 0 ? totalPages : prev));
  }, [nonVeg, selectedPrices, searchQuery]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPrices((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedPrices([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

        <div className="search-section">
          <input
            type="text"
            placeholder="Search non-veg items..............         🔍"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <h4>Price Filter</h4>
          <div className="filter-checkboxes">
            {['10-50', '51-100', '101-200', '201-500', '501-600'].map((range) => (
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
            <button
              onClick={clearFilters}
              disabled={selectedPrices.length === 0 && searchQuery === ''}
              className="clear-filter-button"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="nonveg-items">
          {loading ? (
            <p style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              Loading non-veg items...
            </p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
              Error: {error}
            </p>
          ) : currentItems.length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              No items match the selected filter range or search query.
            </p>
          ) : (
            currentItems.map((product) => (
              <div key={product.name} className="nonveg-item">
                <img
                  src={`http://localhost:4040${product.imagepath}`}
                  onError={(e) => {
                    console.error(`Failed to load image for ${product.name}: ${product.image}`);
                    e.target.src = '/placeholder.jpg';
                  }}
                  alt={product.name}
                  className="nonveg-image"
                />
                <h3 className="nonveg-name">{product.name}</h3>
                <p className="nonveg-price">₹{product.price}</p>
                
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button3"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`pagination-button ${page === currentPage ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button4"
            >
              Next
            </button>
          </div>
        )}
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