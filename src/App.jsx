import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './homeveg.css';

import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolate from './Chocolate';
import Signing from './Signing';

import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Cart from './Cart';

import { useDispatch, useSelector } from 'react-redux';
import Orders from './Orders';
import NotFound from './NotFound';


import Signup from './Signup';
import { logoutUser } from './store';

function App() {
  const cartObject = useSelector((globalstate) => globalstate.cart);
  const totalCartCount = cartObject.reduce((totalSum, item) => totalSum + item.quantity, 0);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch=useDispatch();

  return (
    <BrowserRouter>
      {/* Header */}
      <header className="app-header">
        <div className="header-container">
          {/* Brand and Tagline */}
          <div className="brand">
            <img
              src="https://img.icons8.com/color/48/000000/shopping-basket-2.png"
              alt="BigBasket"
              className="brand-icon"
            />
            <h1 className="brand-name">BigBasket</h1>
            <span className="tagline">Delicious Delivered</span>
          </div>

          {/* Navigation Links */}
          <nav className="navbar">
            <Link to="/home" className="nav-link">🏠 Home</Link>
            <Link to="/veg" className="nav-link">🥦 Veg</Link>
            <Link to="/nonveg" className="nav-link">🍗 NonVeg</Link>
            <Link to="/milk" className="nav-link">🥛 Milk</Link>
            <Link to="/chocolate" className="nav-link">🍫 Chocolate</Link>
            <Link to="/cart" className="nav-link">🛒 Cart({totalCartCount})</Link>
            <Link to="/Orders" className="nav-link">📦 Orders</Link>
            {/* Welcome Message */}
          {isAuthenticated ? (
            <div>
              
            <span> Welcome, {currentUser.username}</span>
            <button onClick={()=>dispatch(logoutUser())}>LogOut</button>
            </div>
          ):(
           <Link to="/signing" className="nav-link">📝 Signing</Link>
          )}
           
            <Link to="/aboutus" className="nav-link">ℹ️ About Us</Link>
            <Link to="/contactus" className="nav-link">📞 Contact</Link>
            
            
          </nav>

        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/signing" element={<Signing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/SignUp"   element={<Signup />}/>
          
          
          
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
    
  );
}

export default App;
