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

  const totalPages = Math.ceil(chocolateProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chocolateProducts.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <>
      <div className="chocolate-container">
        <h2>Chocolate Products</h2>

        <div className="offer-banner">
          {timeLeft > 0 ? (
            <>
              ⏳ Hurry! Offer ends in: <span className="timer">{formatTime(timeLeft)}</span>
            </>
          ) : (
            <span style={{ color: '#fff' }}>❌ Offer expired!</span>
          )}
        </div>

        <div className="chocolate-items">
          {currentItems.map((product) => (
            <div key={product.name} className="chocolate-item">
              <img src={product.image} alt={product.name} className="chocolate-image" />
              <h3 className="chocolate-name">{product.name}</h3>
              <p className="chocolate-price">₹{product.price}</p>
              <p className="chocolate-description">{product.description}</p>
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
>
  Add To Cart 🛒
</button>

            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="pagination-button pagination-button-prev"
          >
            Previous
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

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="pagination-button pagination-button-next"
          >
            Next
          </button>
        </div>
      </div>
<ToastContainer />

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-top">
          <h3 className="footer-title"> 🧺 BigBasket- All Items Are Available Here!🙂</h3>
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