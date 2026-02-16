import React, { useState } from 'react';
import loginBg from '../assets/Rectangle906.png';
import logo from '../assets/logo.webp';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

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
     logoContainer: {
      alignSelf: 'flex-start', // LEFT aligned like the heading
      marginBottom: '1rem',
      display: 'flex'
    },
    logo: {
      width: '150px',
      height: 'auto',
      maxHeight: '110px'
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
    backToLogin: {
      textAlign: 'center',
      marginTop: '2rem'
    },
    backLink: {
      color: '#17A1CB',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
      transition: 'opacity 0.2s ease'
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset request for:', email);
    // Handle password reset logic here
    alert('Password reset link has been sent to your email!');
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

        {/* Right Panel - Forgot Password Form */}
        <div style={styles.rightPanel}>
          <div style={styles.loginForm}>
            <div style={styles.logoContainer}>
                         <img 
                           src={logo} 
                           alt="Logo"
                           style={styles.logo}
                         />
                       </div>
            <h1 style={styles.title}>Forgot Password?</h1>
            <p style={styles.subtitle}>Enter your Email to receive a verification code.</p>
            
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  background: '#17A1CB',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.625rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(23, 161, 203, 0.3)'
                }}
                onMouseOver={(e) => Object.assign(e.target.style, {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(23, 161, 203, 0.4)'
                })}
                onMouseOut={(e) => Object.assign(e.target.style, {
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 12px rgba(23, 161, 203, 0.3)'
                })}
              >
                Send OTP
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
