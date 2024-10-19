// src/authService.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al registrar:", error);
    throw error;
  }
};
