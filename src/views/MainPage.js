// src/views/MainPage.js
import React, { useState } from "react";
import { auth, storage } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./MainPage.css";

const ErrorNotification = ({ message, onClose }) => {
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="error-notification">
      <p>{message}</p>
    </div>
  );
};

const MainPage = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        showError("Only PDF files are allowed.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        showError("File size must be less than 5MB.");
        return;
      }
      setFile(selectedFile);
      setErrorMessage("");
      setSuccessMessage(""); // Clear success message when a new file is selected
    }
  };

  const handleUpload = () => {
    if (!file) {
      showError("Please select a file first.");
      return;
    }
    if (isUploaded) {
      showError("You can only upload one file.");
      return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      showError("User not authenticated.");
      return;
    }

    const storageRef = ref(storage, `${userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        showError("Upload failed. Please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploaded(true);
          setSuccessMessage("File uploaded successfully!");
          setErrorMessage("");
        });
      }
    );
  };

  return (
    <div className="main-page">
      <div className="user-info">
        <h1>Welcome, {auth.currentUser?.displayName}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="upload-section">
        <h2>Upload Your Document</h2>
        <input
          type="file"
          onChange={handleFileChange}
          disabled={isUploaded}
          className="file-input"
        />

        <button onClick={handleUpload} disabled={!file || isUploaded}>
          {isUploaded ? "File Uploaded" : "Upload"}
        </button>

        {uploadProgress > 0 && (
          <progress
            value={uploadProgress}
            max="100"
            className="upload-progress"
          />
        )}

        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default MainPage;
