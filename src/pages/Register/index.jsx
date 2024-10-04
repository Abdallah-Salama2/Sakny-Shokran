import "./styles.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
          setMessage(response.data.message);
      } catch (error) {
          setMessage('Error: Could not register');
      }
  };

  return (
    <div className="content container justify-content-center align-items-center d-flex shadow-lg flex-column" id="content">
            <h2>Register</h2>
            <form className="form  w-75 p-1" onSubmit={handleRegister}>
                <input
                    className="form-control form-control-lg bg-light fs-6 mb-3"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="form-control form-control-lg bg-light fs-6 mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="form-control form-control-lg bg-light fs-6 mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="buttons-group d-flex justify-content-between">
                    <button className="btn border-white text-white fs-6" type="submit">Register</button>
                    <button className="btn border-white text-white fs-6 "  onClick={() => navigate('/login')}>
                    Login
                    </button>
                </div>

            </form>
            <p className="text-black">{message}</p>
    </div>
  );
}
