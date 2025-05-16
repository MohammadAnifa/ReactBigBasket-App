import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div>
      <div className="about-container">
        <h1>About BigBasket</h1>
        <p>
          Welcome to <span>BigBasket</span>, India’s leading online grocery store, committed to delivering fresh produce and daily essentials to your doorstep.
        </p>
        <p>
          Since our inception, we've focused on making grocery shopping easy, quick, and hassle-free. With a wide range of categories and top-quality products, we aim to bring convenience and reliability to your kitchen.
        </p>
        <p>
          Whether it's fresh fruits and vegetables, dairy products, or household items, <span>BigBasket</span> ensures quality and timely delivery every time.
        </p>
      </div>

      <div className="images-section">
        <div>
          <img src="/images/delivery.png" alt="Delivery Team" />
          <p>Fast and safe doorstep delivery</p>
        </div>
        <div>
          <img src="/images/freshveggies.png" alt="Fresh Produce" />
          <p>Farm-fresh vegetables and fruits</p>
        </div>
        <div>
          <img src="/images/warehouse.png" alt="Warehouse" />
          <p>Efficient warehousing and logistics</p>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 BigBasket. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AboutUs;
