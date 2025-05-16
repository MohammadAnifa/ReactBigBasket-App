import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, decrementCart, incrementCart, removeFromCart, ordersDetails} from './store';
import './Cart.css';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';

function Cart() {
  const cartObjects = useSelector((globalState) => globalState.cart);
   
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [couponName, setCouponName] = useState('');
  const [couponCodeDiscountPer, setCouponCodeDiscountPer] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [PaymentMethod, setPaymentMethod] = useState('');
  const couponCodeRef = useRef();
  const cardNumberRef = useRef();
  const cardExpiryRef = useRef();
  const cardCVVRef = useRef();
  const emailref = useRef();
  const [customerEmail, setCustomerEmail] = useState('anifamohammad695@gmail.com');

  const shipping = 50;

  const handleApplyCoupon = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    setCouponName(couponCode);
    switch (couponCode) {
      case 'RATAN10':
        setCouponCodeDiscountPer(10);
        break;
      case 'RATAN20':
        setCouponCodeDiscountPer(20);
        break;
      case 'RATAN30':
        setCouponCodeDiscountPer(30);
        break;
      default:
        alert('Invalid coupon code');
        setCouponCodeDiscountPer(0);
    }
  };

  const calculateAmounts = () => {
    const totalPrice = cartObjects.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (totalPrice * discountPercentage) / 100;
    let afterDiscount = totalPrice - discountAmount;
    const couponDiscountAmount = (afterDiscount * couponCodeDiscountPer) / 100;
    afterDiscount -= couponDiscountAmount;
    const tax = 0.5;
    const finalAmount = afterDiscount + tax + shipping;
    return { totalPrice, discountAmount, couponDiscountAmount, tax, finalAmount };
  };

  const { totalPrice, discountAmount, couponDiscountAmount, tax, finalAmount } = calculateAmounts();

  const fireConfetti = () => {
    const duration = 5000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const interval = setInterval(() => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      confetti(Object.assign({}, defaults, {
        particleCount: 50,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      }));
    }, 250);
  };

  const handleCompletePurchase = () => {
     
     // Check if user is logged in
    

    const purchaseDate = new Date().toLocaleString();
    const purchaseDetails = {
      orderId: 'ORD-' + new Date().getTime(),
      date: purchaseDate,
      items: [...cartObjects],
      finalAmount: finalAmount,
    };

    dispatch(clearCart());
    dispatch(ordersDetails(purchaseDetails));
    fireConfetti();

    setPurchaseMessage(`🎉 Thank you for your purchase! You will be redirected to your orders page in 5 seconds.`);

    let timer = 5;
    const interval = setInterval(() => {
      setCountdown(timer);
      timer--;
      if (timer < 0) {
        clearInterval(interval);
        navigate('/orders');
      }
    }, 1000);

    const baseURL = window.location.origin;
    const templateParams = {
      order_id: purchaseDetails.orderId,
      email: customerEmail,
      date: purchaseDate, 
      orders: purchaseDetails.items.map(item => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity,
        image_url: `${baseURL}/images/${item.image}`
      })),
      cost: {
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        discount: discountAmount.toFixed(2),
        couponcode: couponName || "None",
        coupon_discount: couponDiscountAmount.toFixed(2),
        total: finalAmount.toFixed(2)
      }
    };

    emailjs.send(
      'service_dtv9fdr',
      'template_qgpmt6o',
      templateParams,
      'dIoyqORJ3a6-VyJCv'
    ).then(() => {
      alert("Email sent successfully");
    }).catch((error) => {
      alert("Email sending failed", error);
    });
  };

  return (
    <>
      <div className="cart-container">
        <h1>Cart 🛒</h1>
        {cartObjects.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartObjects.map((item, index) => (
                <tr key={index} className="cart-item">
                  <td><img src={item.image} alt={item.name} className="cart-item-image" /></td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => dispatch(decrementCart(item))} className="btn-decrement">-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => dispatch(incrementCart(item))} className="btn-increment">+</button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => dispatch(removeFromCart(item))} className="btn-remove">Remove 🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-cart-message fade-in">
            {purchaseMessage ? `${purchaseMessage} (${countdown})` : '🛒 Your cart is empty.............☹️'}
          </p>
        )}
      </div>

      <div className="email-section">
        <h4>📧 Enter your email to receive the order details:</h4>
        <input
          type="email"
          ref={emailref}
          placeholder="Enter your email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>

      {cartObjects.length > 0 && (
        <div className="payment-details">
          <h2>💳 Payment Details</h2>
          <table className="payment-table">
            <tbody>
              <tr><td>💰 Total Amount:</td><td>${totalPrice.toFixed(2)}</td></tr>
              <tr><td>💸 Discount ({discountPercentage}%):</td><td>-${discountAmount.toFixed(2)}</td></tr>
              <tr><td>💸 Coupon Discount ({couponCodeDiscountPer}%):</td><td>-${couponDiscountAmount.toFixed(2)}</td></tr>
              <tr><td>🧾 Tax:</td><td>+${tax.toFixed(2)}</td></tr>
              <tr><td>🚚 Shipping:</td><td>+${shipping.toFixed(2)}</td></tr>
              <tr><td><strong>🏷️ Final Price:</strong></td><td><strong>${finalAmount.toFixed(2)}</strong></td></tr>
              {couponName && <tr><td>✅ Coupon Applied:</td><td>{couponName}</td></tr>}
            </tbody>
          </table>

          <div className="coupon-box">
            <input
              type="text"
              ref={couponCodeRef}
              placeholder="🎟️ Enter Coupon Code.............🎉"
              className="coupon-input"
            />
            <br /><br />
            <button onClick={handleApplyCoupon} className="apply-coupon-btn">🎟️ Apply Coupon</button>
            {couponCodeDiscountPer > 0 && (
              <h2>Applied Coupon {couponName} : ₹{couponDiscountAmount.toFixed(2)}</h2>
            )}
          </div>

          <div className="discount-btns" style={{ marginTop: '20px' }}>
            <button onClick={() => { setDiscountPercentage(10); setSelectedDiscount(10); }} className={`discount-btn discount-10 ${selectedDiscount === 10 ? 'active' : ''}`}>10% Discount</button>
            <button onClick={() => { setDiscountPercentage(20); setSelectedDiscount(20); }} className={`discount-btn discount-20 ${selectedDiscount === 20 ? 'active' : ''}`}>20% Discount</button>
            <button onClick={() => { setDiscountPercentage(30); setSelectedDiscount(30); }} className={`discount-btn discount-30 ${selectedDiscount === 30 ? 'active' : ''}`}>30% Discount</button>
            <button onClick={() => { setDiscountPercentage(0); setSelectedDiscount(0); }} className={`discount-btn discount-none ${selectedDiscount === 0 ? 'active' : ''}`}>No Discount</button>
          </div>

          <div className="order-now-section" style={{ marginTop: '20px' }}>
            <button onClick={() => setShowPaymentOptions(true)} className="order-now-btn">🛍️ Order Now</button>

            {showPaymentOptions && (
              <div className="payment-options-box">
                <h3>Choose a Payment Method:</h3>
                <div className="payment-icons">
                  <button onClick={() => setPaymentMethod('qr')} className="payment-icon">
                    <img src="/images/qr.png" alt="QR Code Payment" />
                    <p>QR Code</p>
                  </button>
                  <button onClick={() => setPaymentMethod('card')} className="payment-icon">
                    <img src="/images/pay.png" alt="Card Payment" />
                    <p>Card Payment</p>
                  </button>
                </div>
                <button onClick={handleCompletePurchase} className="complete-purchase-btn">
                  ✅ Payment is done.
                </button>
              </div>
            )}
          </div>

          {PaymentMethod === 'qr' && (
            <div className="qr-container mt-3">
              <h4>Scan UPI QR to Pay ₹{finalAmount.toFixed(2)}</h4>
              <QRCode value={`upi://pay?pa=anifamohammad695@oksbi&pn=AnifaStore&am=${finalAmount.toFixed(2)}&cu=INR`} />
              <p>UPI ID: <strong>anifamohammad695@oksbi</strong></p>
            </div>
          )}

          {PaymentMethod === 'card' && (
            <div className="card-payment-container mt-3">
              <h4>Enter Card Details</h4>
              <div>
                <label>Card Number</label>
                <input type="text" ref={cardNumberRef} placeholder="1234 5678 9012 3456" className="form-control" />
              </div>
              <div>
                <label>Expiration Date</label>
                <input type="text" ref={cardExpiryRef} placeholder="MM/YY" className="form-control" />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" ref={cardCVVRef} placeholder="123" className="form-control" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
