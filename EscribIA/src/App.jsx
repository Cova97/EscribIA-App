import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, Button } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appAuth from "../src/services/authService";

// Importación de los componentes
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

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

    return () => unsubscribe();
  }, []);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <Box
        className="App bg-gradient-to-r from-teal-500 to-green-500 flex justify-center items-center min-h-screen"
        px={{ base: '4', md: '8' }}  // Chakra responsive padding
      >
        {user ? (
          <Home correoUsuario={user.email} />
        ) : (
          <VStack
            spacing={4}
            maxW={{ base: '90%', md: '50%', lg: '30%' }}  // Chakra responsive width
            w="full"
            p={6}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            className="shadow-2xl rounded-lg"
          >
            {showRegister ? (
              <RegisterForm />
            ) : (
              <LoginForm />
            )}
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={toggleForm}
              w="full"
              className="hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
            >
              {showRegister ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
            </Button>
          </VStack>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
