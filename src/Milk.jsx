import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './store'; // adjust path if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Milk.css'; // styling file

const Milk = () => {
  const dispatch = useDispatch();
  const milkProducts = useSelector((state) => state.products.milk);

 useEffect(() => {
  toast.info('🧃 Welcome to the Milk Section!');
}, [currentPage]); // now it shows when page changes


  // ✅ Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(milkProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = milkProducts.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ Countdown Timer setup (22h 30m 5s)
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

  // ✅ Add to cart with toast
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <>
      <div className="milk-container">
        <h2>Milk Products</h2>

        <div className="offer-banner">
          {timeLeft > 0 ? (
            <>⏳ Hurry! Offer ends in <span className="timer">{formatTime(timeLeft)}</span></>
          ) : (
            <>❌ Offer expired!</>
          )}
        </div>

        <div className="milk-items">
          {currentItems.map((product) => (
            <div key={product.name} className="milk-item">
              <img src={product.image} alt={product.name} className="milk-image" />
              <h3 className="milk-name">{product.name}</h3>
              <p className="milk-price">₹{product.price}</p>
              <p className="milk-description">{product.description}</p>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <button onClick={() => toast.info('🧃 Test Toast!')}>Test Toast</button>

      </div>

      {/* Toasts */}
      <ToastContainer position="top-left" autoClose={2000} theme="colored" />
      

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TrendyMart. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Milk;
