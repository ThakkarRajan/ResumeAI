// src/controllers/AuthController.js

// This can be expanded with more authentication logic as needed.
export const handleSignIn = async (auth, provider) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };