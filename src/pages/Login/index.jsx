import "./styles.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // state to Remember Me
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/login', { email, password });
          setMessage(response.data.message);

          if (rememberMe) {
              // save data if choose Remember Me
              localStorage.setItem('token', response.data.token);
          } else {
              sessionStorage.setItem('token', response.data.token);
          }
      } catch (error) {
          setMessage('Error: Invalid credentials');
      }
  };

  return (
    <div className="content container justify-content-center align-items-center d-flex shadow-lg flex-column" id="content">
        <h2>Login</h2>
        <form className="form  w-75 p-1 text-center" onSubmit={handleLogin}>
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

            {/*  Checkbox to Remember Me */}
            <div className="d-flex justify-content-between">
              <div className="check">
                <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
              </div>

                <p>
                  <a href="/forgot-password">Forgot Password?</a>
                </p>
            </div>
            <div className="buttons-group d-flex justify-content-between">
              <button type="submit">Login</button>
              <button onClick={() => navigate('/register')}>
                Register
              </button>
            </div>

        </form>
        <p>{message}</p>


    </div>
  );
}

