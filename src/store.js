import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:4040/products/all');
  return response.data;
});

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [],
    nonVeg: [],
    milk: [],
    chocolates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.veg = [];
        state.nonVeg = [];
        state.milk = [];
        state.chocolates = [];

        
        action.payload.forEach((product) => {
          const category = product.category?.toLowerCase();
          if (category === 'veg') state.veg.push(product);
          else if (category === 'nonveg') state.nonVeg.push(product);
          else if (category === 'milk') state.milk.push(product);
          else if (category === 'chocolates') state.chocolates.push(product); // Fixed typo (fruit -> chocolates)
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Initialize cart from localStorage
const savedCart = localStorage.getItem('cart');
const initialCartState = savedCart ? JSON.parse(savedCart) : [];

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState, // Fixed: Use initialCartState instead of localStorage
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementCart: (state, action) => {
      const item = state.find((item) => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementCart: (state, action) => {
      const itemIndex = state.findIndex((item) => item.name === action.payload.name);
      if (itemIndex > -1) {
        if (state[itemIndex].quantity > 1) {
          state[itemIndex].quantity -= 1;
        } else {
          state.splice(itemIndex, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.name !== action.payload.name);
    },
    clearCart: () => {
      return [];
    },
  },
});

// Order slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    ordersDetails: (state, action) => {
      // Adding a unique ID to the order (optional: you can generate IDs if needed)
      state.push({ ...action.payload, id: Date.now() }); // Added unique ID using timestamp
    },
  },
});

// User slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      const foundUser = state.users.find(
        (user) => user.username === action.payload.username && user.password === action.payload.password
      );
      if (foundUser) {
        state.currentUser = foundUser;
        state.isAuthenticated = true;
      } else {
        alert('Invalid Credentials'); // Consider replacing alert with a more robust error handling mechanism
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

// Configure store
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
    users: userSlice.reducer,
  },
});

// Subscribe to store changes to persist cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

// Export actions
export const { addToCart, incrementCart, decrementCart, removeFromCart, clearCart } = cartSlice.actions;
export const { ordersDetails } = orderSlice.actions;
export const { registerUser, loginUser, logoutUser } = userSlice.actions;

// Export store
export default store;