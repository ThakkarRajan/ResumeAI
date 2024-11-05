// src/App.js
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import MainPage from "./views/MainPage";
import "./App.css"; // Import the CSS file

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="App">
        
        {user ? <MainPage /> : <Login />}
      </div>
    </>
  );
}

export default App;
