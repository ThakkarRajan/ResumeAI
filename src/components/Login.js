// src/components/Login.js
import React from "react";
import { auth, googleProvider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <>
      <header className="App-header">
        <h1>Welcome to RESUME AI</h1>
        <p>Your intelligent resume builder</p>
      </header>
      <div className="login-container">
        <button className="login-button" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      </div>
    </>
  );
};

export default Login;
