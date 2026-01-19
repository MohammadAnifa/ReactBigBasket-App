import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchProducts } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Veg.css";
import "./Footer.css";

const Veg = () => {
  const dispatch = useDispatch();
  const { veg, loading, error } = useSelector((state) => state.products);

  const [filteredVegItems, setFilteredVegItems] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [timer, setTimer] = useState(22 * 3600 + 29 * 60 + 6); // 22h 29m 6s
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    let filtered = [...veg];

    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter((item) =>
        selectedPrices.some((range) => {
          if (range === "0-30") return item.price >= 0 && item.price <= 30;
          if (range === "31-60") return item.price >= 31 && item.price <= 60;
          if (range === "61-100") return item.price >= 61 && item.price <= 100;
          if (range === "100+") return item.price > 100;
          return false;
        })
      );
    }

    setFilteredVegItems(filtered);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [veg, selectedPrices, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVegItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVegItems.length / itemsPerPage);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPrices((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedPrices([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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
      <h1 className="veg-title">Fresh Vegetables 🫑</h1>

      <div className="search-section">
        <div className="search-wrapper">
          <span className="search-icon"></span>
          <input
            type="text"
            placeholder="Search vegetables....................                🔍"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <div className="offer-banner">
        Limited Time Offer: Flat 20% Off!{" "}
        <span className="timer">⏰ {formatTime(timer)}</span>
      </div>

      <div className="main-content">
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
            <button
              onClick={clearFilters}
              disabled={selectedPrices.length === 0 && searchQuery === ""}
              className="clear-filter-button"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="products-container">
          <div className="veg-products-section">
            {loading ? (
              <p style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                Loading vegetables...
              </p>
            ) : error ? (
              <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
                Error: {error}
              </p>
            ) : currentItems.length === 0 ? (
              <p style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                No vegetables match the selected filter range or search query.
              </p>
            ) : (
              currentItems.map((product, index) => (
                <div key={index} className="veg-item">
                  <img
                    src={`http://localhost:4040${product.imagepath}`}
                    onError={(e) => {
                      console.error(`Failed to load image for ${product.name}: ${product.image}`);
                      e.target.src = '/placeholder.jpg';
                    }}
                    alt={product.name}
                    className="veg-image"
                  />
                  <div className="veg-content">
                    <h3 className="veg-name">{product.name}</h3>
                    <p className="veg-price">₹{product.price}</p>
                    <p className="veg-description">{product.description}</p>
                    <button
                      className="veg-button"
                      onClick={() => {
                        dispatch(addToCart(product));
                        toast.success(`${product.name} added to cart!`, {
                          position: "top-center",
                          autoClose: 1500,
                          theme: "colored",
                        });
                      }}
                    >
                      Add to Cart🛒
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination-btn">
              <button
                className="pagination-button1"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`pagination-number ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="pagination-button2"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />

      <footer className="footer">
        <div className="footer-top">
          <h3 className="footer-title">
            🧺 BigBasket - All Items Are Available Here! 🙂
          </h3>
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
          <p className="footer-copy">
            © 2025 FoodsZone. All Rights Reserved By Ashvita Kapat
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Veg;