import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import loginBg from '../assets/Rectangle906.png';
import Glogo from '../assets/google.jpg';
import logo from '../assets/logo.webp';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@crmhrm.com'); // Default admin email
  const [password, setPassword] = useState('Admin@123'); // Default admin password
  const [rememberMe, setRememberMe] = useState(false);

  const styles = {
    // Full screen container
    fullScreenContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: 1000
    },
    loginContainer: {
      display: 'flex',
      height: '100vh',
      width: '100vw',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      overflow: 'hidden'
    },
    leftPanel: {
      flex: 1,
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: '2rem',
      position: 'relative',
      minHeight: '100vh'
    },
    illustration: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1
    },
    rightPanel: {
      flex: 1,
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   
  
    },
    loginForm: {
      width: '550px',
      maxWidth: '420px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '738px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#ffffff',
      marginBottom: '0.75rem',
      lineHeight: 1.2
    },
    subtitle: {
      color: '#ffffff',
      fontSize: '0.95rem',
      marginBottom: '2rem',
      fontWeight: 400
    },
    inputGroup: {
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#ffffff',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      border: '1px solid #e0e0e0',
      borderRadius: '0.625rem',
      fontSize: '0.95rem',
      backgroundColor: '#fafafa',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box',
      outline: 'none'
    },
    formOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      fontSize: '0.85rem'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      userSelect: 'none'
    },
    checkboxInput: {
      width: '16px',
      height: '16px',
      marginRight: '0.625rem',
      accentColor: '#17A1CB',
      cursor: 'pointer'
    },
    checkboxLabel: {
      color: '#ffffff',
      fontWeight: 400
    },
    forgotPassword: {
      color: '#17A1CB',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'opacity 0.2s ease'
    },
    loginBtn: {
      width: '100%',
      padding: '0.875rem',
      background: '#17A1CB',
      color: 'white',
      border: 'none',
      borderRadius: '0.625rem',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      marginBottom: '1rem',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(23, 161, 203, 0.3)'
    }, 
    logoContainer: {
      alignSelf: 'flex-start',
      marginBottom: '1rem',
      display: 'flex'
    },
    logo: {
      width: '150px',
      height: 'auto',
      maxHeight: '110px'
    },
    loginBtnHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(23, 161, 203, 0.4)'
    },
    googleBtn: {
      width: '100%',
      padding: '0.875rem',
      backgroundColor: '#ffffff',
      color: '#333333',
      border: '1px solid #e0e0e0',
      borderRadius: '0.625rem',
      fontSize: '0.95rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    googleBtnHover: {
      borderColor: '#17A1CB',
      boxShadow: '0 2px 8px rgba(23, 161, 203, 0.15)'
    },
    orSeparator: {
      display: 'flex',
      alignItems: 'center',
      margin: '1.5rem 0',
      position: 'relative'
    },
    orLine: {
      flex: 1,
      height: '1px',
      backgroundColor: '#333333'
    },
    orText: {
      margin: '0 1rem',
      color: '#ffffff',
      fontSize: '0.875rem',
      fontWeight: 400
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#17A1CB';
    e.target.style.boxShadow = '0 0 0 3px rgba(23, 161, 203, 0.1)';
    e.target.style.backgroundColor = '#ffffff';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e0e0e0';
    e.target.style.boxShadow = 'none';
    e.target.style.backgroundColor = '#fafafa';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, rememberMe });
    
    try {
      // Call real API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Update AuthContext and navigate
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        // Handle login error
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.loginContainer}>
        {/* Left Panel - Illustration */}
        <div style={styles.leftPanel}>
          <img 
            src={loginBg} 
            alt="Background"
            style={styles.illustration}
          />
        </div>

        {/* Right Panel - Login Form */}
        <div style={styles.rightPanel}>
          <div style={styles.loginForm}>
              <div style={styles.logoContainer}>
             <img 
               src={logo} 
               alt="Logo"
               style={styles.logo}
             />
           </div>
            <h1 style={styles.title}>Log in</h1>
            <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
            
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="mail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              {/* Password Input */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              {/* Checkbox and Forgot Password */}
              <div style={styles.formOptions}>
                <label style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={styles.checkboxInput}
                  />
                  <span style={styles.checkboxLabel}>Remember me</span>
                </label>
                <Link to="/forgot-password" style={styles.forgotPassword}>Forgot Password?</Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                style={styles.loginBtn}
                onMouseOver={(e) => Object.assign(e.target.style, styles.loginBtnHover)}
                onMouseOut={(e) => Object.assign(e.target.style, {
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 12px rgba(23, 161, 203, 0.3)'
                })}
              >
                Sign in
              </button>

              {/* Or Separator */}
              <div style={styles.orSeparator}>
                <div style={styles.orLine}></div>
                <span style={styles.orText}>or Sign in with Email</span>
                <div style={styles.orLine}></div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                style={styles.googleBtn}
                onMouseOver={(e) => Object.assign(e.target.style, styles.googleBtnHover)}
                onMouseOut={(e) => Object.assign(e.target.style, {
                  borderColor: '#e0e0e0',
                  boxShadow: 'none'
                })}
              >
                <img 
                  src={Glogo} 
                  alt="Google logo" 
                  style={{ width: '40px', height: '20px', marginRight: '0.5rem' }}
                />
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
