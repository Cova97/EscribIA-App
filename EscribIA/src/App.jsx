import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appAuth from "../src/services/authService";

// Importación de los componentes
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

// Importación de estilos
import './App.css';

const auth = getAuth(appAuth);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  if (loading) {
    // You could return a loading spinner or skeleton here
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <Box className="App">
        {user ? (
          <Home correoUsuario={user.email} />
        ) : (
          <VStack spacing={4}>
            {showRegister ? (
              <RegisterForm />
            ) : (
              <LoginForm />
            )}
            <Box
              as="button"
              color="blue.500"
              onClick={toggleForm}
            >
              {showRegister ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
            </Box>
          </VStack>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;