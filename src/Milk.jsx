import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './store'; // adjust path if needed
import './Milk.css'; // styling file
import './Footer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Milk = () => {
  const dispatch = useDispatch();
  const milkProducts = useSelector((state) => state.products.milk);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Filter state
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // Define price ranges (matches screenshot)
  const priceRanges = [
    { label: 'Under ₹50', min: 0, max: 50 },
    { label: '₹50 - ₹100', min: 50, max: 100 },
    { label: 'Over ₹100', min: 100, max: Infinity },
  ];

  // Filter products based on price ranges
  const filteredProducts = milkProducts.filter((product) => {
    const priceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some((range) =>
      product.price >= priceRanges.find((pr) => pr.label === range).min &&
      product.price < priceRanges.find((pr) => pr.label === range).max
    );
    return priceMatch;
  });

  // Pagination for filtered products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPriceRanges]);

  // Countdown Timer setup (22h 29m 44s as per screenshot)
  const [timeLeft, setTimeLeft] = useState(22 * 3600 + 29 * 60 + 44);
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

  // Handle price range checkbox changes
  const handlePriceChange = (range) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedPriceRanges([]);
  };

  // Add to cart
  const handleAddToCart = (product) => {
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
  };

  return (
    <>
      <div className="milk-container">
        <h2>Milk Products</h2>

        <div className="offer-banner">
          {timeLeft > 0 ? (
            <>HURRY! Offer ends in <span className="timer">{formatTime(timeLeft)}</span></>
          ) : (
            <>❌ Offer expired!</>
          )}
        </div>

        <div className="content-wrapper">
          {/* Filter Sidebar (Single Card) */}
          <div className="sidebar">
            <h3>Filters</h3>
            <div className="filter-section">
              <h4>Price Range</h4>
              {priceRanges.map((range) => (
                <label key={range.label} className="filter-label">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.label)}
                    onChange={() => handlePriceChange(range.label)}
                  />
                  {range.label}
                </label>
              ))}
              <button onClick={handleClearAll} className="clear-all-btn">
                Clear All
              </button>
            </div>
          </div>

          {/* Product Cards (Aligned to the left) */}
          <div className="milk-items">
            {currentItems.length > 0 ? (
              <div className="milk-row">
                {currentItems.map((product) => (
                  <div key={product.name} className="milk-item">
                    <img src={product.image} alt={product.name} className="milk-image" />
                    <h3 className="milk-name">{product.name}</h3>
                    <p className="milk-price">₹{product.price}</p>
                    <p className="milk-description">{product.description}</p>
                    <div className="button-wrapper">
                      <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products match the selected filters.</p>
            )}
          </div>
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button pagination-button-prev"
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
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-button pagination-button-next"
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

export default Milk;