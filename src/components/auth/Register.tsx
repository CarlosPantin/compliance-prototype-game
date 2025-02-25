import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './AuthStyles.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { username, email, password, confirmPassword } = formData;
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError(null);
    await register(username, email, password);
  };

  return (
    <div className="hr-detective auth-page">
      <div className="background"></div>
      <div className="particles"></div>
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="logo-icon">⚖️</div>
            <h1>HR Detective</h1>
          </div>
          
          <h2 className="auth-title">Create Your Account</h2>
          
          {error && <div className="auth-error">{error}</div>}
          {passwordError && <div className="auth-error">{passwordError}</div>}
          
          <form onSubmit={onSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Detective Name</label>
              <div className="input-icon-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={onChange}
                  required
                  minLength={3}
                  placeholder="Detective Smith"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-icon-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  required
                  placeholder="detective@example.com"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  required
                  minLength={6}
                  placeholder="Your secret code"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-icon-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  required
                  minLength={6}
                  placeholder="Confirm your secret code"
                />
              </div>
            </div>
            
            <button type="submit" className="auth-button pulse-animation">
              Register
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Already have credentials? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;