import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './store';
import './Signup.css'; // ← import the CSS

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(registerUser(data));
    alert("Registration Successfully");
    navigate('/Signing');
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(myFunc)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          required
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          required
        />

        <div className="gender-group">
          <span>Gender:</span>
          <label>
            <input type="radio" value="Male" {...register("gender")} /> Male
          </label>
          <label>
            <input type="radio" value="Female" {...register("gender")} /> Female
          </label>
        </div>

        <div className="preference-group">
          <label>Select Preference:</label>
          <select {...register("preference")}>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Milk">Milk</option>
            <option value="Chocolate">Chocolate</option>
          </select>
        </div>

        <button type="submit">SignUp</button>
      </form>
      <p>
        Already have an account? <a href="/Signing">Sign In</a>
      </p>
    </div>
  );
}

export default Signup;
