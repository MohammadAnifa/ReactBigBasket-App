import React from 'react';
import './ContactUs.css'

function ContactUs() {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>We're here to help! Reach out to us through any of the following ways:</p>
      
      <div className="contact-details">
        <p><strong>Email:</strong> support@bigbasketstore.com</p>
        <p><strong>Phone:</strong> +91-9876543210</p>
        <p><strong>Address:</strong> 123, Market Road, Ameerpet, Hyderabad, Telangana, India</p>
      </div>

      <p>Our customer support team is available from <strong>9:00 AM to 9:00 PM</strong>, Monday to Saturday.</p>
      <p>We aim to respond to all queries within 24 hours.</p>
    </div>
  );
}

export default ContactUs;
