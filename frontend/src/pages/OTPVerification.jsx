import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "../assets/Rectangle906.png";
import logo from "../assets/logo.webp";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const styles = {
    fullScreenContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      zIndex: 1000,
    },
    container: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    },
    leftPanel: {
      flex: 1,
      position: "relative",
      backgroundColor: "#000",
    },
    illustration: {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    rightPanel: {
      flex: 1,
      backgroundColor: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    formContainer: {
      width: "420px",
      display: "flex",
      flexDirection: "column",
    },
    logo: {
      width: "150px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "30px",
      color: "#ffffff",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#cccccc",
      marginBottom: "30px",
    },
    otpContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "25px",
    },
    otpInput: {
      width: "50px",
      height: "55px",
      borderRadius: "10px",
      border: "1px solid #e0e0e0",
      textAlign: "center",
      fontSize: "20px",
      backgroundColor: "#f5f5f5",
      outline: "none",
      transition: "0.3s",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#17A1CB",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: 600,
      cursor: "pointer",
      marginBottom: "15px",
      boxShadow: "0 4px 12px rgba(23, 161, 203, 0.3)",
    },
    resend: {
      textAlign: "center",
      color: "#17A1CB",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    console.log("OTP Verified:", enteredOtp);
    navigate("/reset-password");
  };

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.container}>
        {/* Left Image */}
        <div style={styles.leftPanel}>
          <img src={loginBg} alt="Background" style={styles.illustration} />
        </div>

        {/* Right Section */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />

            <h1 style={styles.title}>OTP Verification</h1>
            <p style={styles.subtitle}>
              Verify your identity using the code we sent you.
            </p>
             <p style={styles.subtitle}>
              Enter OTP
            </p>

            <form onSubmit={handleSubmit}>
              <div style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={styles.otpInput}
                  />
                ))}
              </div>

              <button type="submit" style={styles.button}>
                Verify OTP
              </button>

              <div style={styles.resend}>Resend OTP</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
