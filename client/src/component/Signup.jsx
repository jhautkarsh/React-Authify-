import React, { useState } from "react";
import axios from "axios";

const Signup = (props) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form data state with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Function to handle form submission
  // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Send a POST request to register the user
    const register = await axios.post('http://localhost:3000/register', formData);
    console.log(register.data); // Log the response data
    alert('Account Created');
    // Clear form fields after successful submission
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  } catch (error) {
    console.error('Registration failed:', error); // Log error if registration fails
  }
}


  return (
    <div className="whole_container">
      <div className="container">
        <header>
          <h1>Sign Up</h1>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            {/* Input fields for name, email, and password */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter UserName"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Strong Password"
            />
            {/* Submit button */}
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </main>
        <footer>
          {/* Link to login page */}
          <p>
            Already have an account? <a href="#">Login Here</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Signup;
