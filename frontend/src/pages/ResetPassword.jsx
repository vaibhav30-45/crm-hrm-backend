import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginBg from "../assets/Rectangle906.png";
import logo from "../assets/logo.webp";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      fontSize: "32px",
      color: "#ffffff",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#cccccc",
      marginBottom: "30px",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      color: "#ffffff",
      marginBottom: "6px",
      fontSize: "14px",
    },
    passwordWrapper: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "14px",
      paddingRight: "45px",
      borderRadius: "10px",
      border: "1px solid #e0e0e0",
      backgroundColor: "#f5f5f5",
      fontSize: "14px",
      outline: "none",
      transition: "0.3s",
      boxSizing: "border-box",
    },
    eyeIcon: {
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#888",
      fontSize: "16px",
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
      marginTop: "10px",
      boxShadow: "0 4px 12px rgba(23, 161, 203, 0.3)",
      transition: "0.3s",
    },
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#17A1CB";
    e.target.style.boxShadow = "0 0 0 3px rgba(23,161,203,0.1)";
    e.target.style.backgroundColor = "#ffffff";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#e0e0e0";
    e.target.style.boxShadow = "none";
    e.target.style.backgroundColor = "#f5f5f5";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    navigate("/login");
  };

  return (
    <div style={styles.fullScreenContainer}>
      <div style={styles.container}>
        {/* Left Image */}
        <div style={styles.leftPanel}>
          <img src={loginBg} alt="Background" style={styles.illustration} />
        </div>

        {/* Right Form */}
        <div style={styles.rightPanel}>
          <div style={styles.formContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />

            <h1 style={styles.title}>Reset Password</h1>
            <p style={styles.subtitle}>
              Create a new password to secure your account.
            </p>

            <form onSubmit={handleSubmit}>
              {/* New Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>New Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <span
                    style={styles.eyeIcon}
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Confirm Password */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                  />
                  <span
                    style={styles.eyeIcon}
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <button type="submit" style={styles.button}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
