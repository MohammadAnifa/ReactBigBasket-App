import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from './store';
import { useNavigate } from 'react-router-dom';
import './Signing.css'; // Add this line if using separate CSS file

function Signing() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(loginUser(data));
    navigate('/Veg');
  };

  return (
    <div className="signing-container">
      <h2>User Signing</h2>
      <form onSubmit={handleSubmit(myFunc)}>
        <input
          type="text"
          placeholder="Username"
          {...register('username')}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        <button type="submit">SignIn</button>
      </form>
      <p>
        Don't have an account? New user <a href="/Signup">Signup</a>
      </p>
    </div>
  );
}

export default Signing;
