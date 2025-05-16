import { useSelector } from 'react-redux';
import './Order.css';
import { useState } from 'react';

const Orders = () => {
  const orders = useSelector(state => state.orders);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // only one open at a time

  const toggleOrder = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  return (
    <div className="orders-container">
      <h2 className="heading">🧾 Your Orders</h2>
      <p className="static-message">Click an order ID to view its details.</p>

      {orders.length === 0 ? (
        <p className="no-orders">🧾 You have no orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.orderId} className="order-card">
            <div
              className="order-header"
              onClick={() => toggleOrder(order.orderId)}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="order-id">📦 Order ID: {order.orderId}</h3>
              <p className="order-date">📅 {order.date}</p>
            </div>

            {expandedOrderId === order.orderId && (
              <div className="order-details">
                <div className="header-right">
                  <p className="order-amount">💸 Total ₹{order.finalAmount.toFixed(2)}</p>
                  <p className="order-status">🚚 Delivered</p>
                </div>
                <h4 className="items-header">🛒 Items:</h4>
                <div className="items-container">
                  {order.items.map((item, idx) => (
                    <div key={`${order.orderId}-${idx}`} className="item-card">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-info">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
