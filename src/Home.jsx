import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Home.css';

const quickCategories = [
  {
    title: 'Vegetables',
    description: 'Fresh and organic vegetables straight from the farm.',
    image: '/images/vegii.png',
    link: '/veg',
  },
  {
    title: 'Non-Veg',
    description: 'High-quality meat and seafood for your meals.',
    image: '/images/non.png',
    link: '/nonveg',
  },
  {
    title: 'Milk Products',
    description: 'Pure dairy items including milk, curd, butter, and more.',
    image: '/images/dairy.png',
    link: '/milk',
  },
  {
    title: 'Chocolates',
    description: 'Delicious chocolates and sweets for every occasion.',
    image: '/images/chocoo.png',
    link: '/chocolates',
  },
];

const foodItems = [
  { name: 'Dry Fruits', img: '/images/dryfruits.png' },
  { name: 'Fruits', img: '/images/fruitss.png' },
  { name: 'Cakes', img: '/images/cake.png' },
  { name: 'Snacks', img: '/images/snaks.png' },
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Welcome Section */}
      <section className="welcome-section full-window">
        <div className="welcome-content-full">
          <h1 className="welcome-title-full">
            🧺 Welcome to <span className="highlight">BigBasket</span>!
          </h1>
          <p className="welcome-description-full">
            Your one-stop shop for fresh groceries, premium meat, dairy products, and tasty chocolates.
          </p>
          <div className="search-bar-full">
            <input
              type="text"
              className="search-input-full"
              placeholder="Search for dishes or categories..."
            />
            <FaSearch className="search-icon-full" />
          </div>
          <a href="#menu" className="scroll-button-full">
            Start Shopping ↓
          </a>
        </div>
        <div className="quick-categories-full">
          {quickCategories.map((item, index) => (
            <Link to={item.link} className="category-circle-full" key={index}>
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Menu */}
      <section className="menu-section" id="menu">
        <div className="container">
          <h2 className="section-title">Our Menu</h2>
          <div className="menu-grid">
            {quickCategories.map((item, index) => (
              <Link to={item.link} key={index} className="menu-card">
                <img src={item.image} alt={item.title} className="menu-image" />
                <h3 className="menu-title">{item.title}</h3>
                <p className="menu-description">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Food Items Marquee */}
      <section className="food-items-marquee">
        <div className="container">
          <h2>Special Food Items</h2>
          <div className="marquee-container">
            <div className="marquee-content">
              {foodItems.map((item, index) => (
                <div className="marquee-item" key={index}>
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>🛒 Wide Variety of Fresh Groceries</li>
            <li>🚚 Timely Delivery to Your Doorstep</li>
            <li>💰 Affordable Pricing & Discounts</li>
            <li>🔐 Secure Payment Options</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h4>Get to Know Us</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect with Us</h4>
            <ul>
              <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Let Us Help You</h4>
            <ul>
              <li><Link to="/cart">Your Cart</Link></li>
              <li><Link to="/orders">Your Orders</Link></li>
              <li><Link to="/faq">Help</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} BigBasket. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
