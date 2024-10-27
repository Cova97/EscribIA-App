import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Button,
  HStack,
  Text,
  Link,
  useColorModeValue,
  Spinner,
  Container,
  Heading,
} from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appAuth from "../src/services/authService";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// Importación de los componentes
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const auth = getAuth(appAuth);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook de navegación

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
        navigate('/'); // Navegar al Home si el usuario está autenticado
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <Box className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const headerBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("teal.600", "teal.400");

  return (
    <ChakraProvider>
      <Box className="min-h-screen" bg={bgColor} px={4} py={8}>
        <Container maxW="container.xl">
          {!user && (
            <Box
              bg={headerBgColor}
              py={6}
              px={10}
              borderRadius="lg"
              boxShadow="lg"
              mb={10}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Heading size="lg" color={textColor} fontWeight="bold">
                  Mi Aplicación
                </Heading>
                <HStack spacing={6}>
                  <Link onClick={() => navigate('/')} fontWeight="bold" color={textColor} _hover={{ color: buttonColor }}>
                    Inicio
                  </Link>
                  <Button variant="outline" colorScheme="teal" borderWidth={2} onClick={() => navigate('/login')} boxShadow="md" _hover={{ boxShadow: "lg" }}>
                    Sign in
                  </Button>
                  <Button colorScheme="teal" variant="solid" borderRadius="full" onClick={() => navigate('/register')} boxShadow="md" _hover={{ boxShadow: "lg" }}>
                    Open an Account
                  </Button>
                </HStack>
              </HStack>
            </Box>
          )}

          <Routes>
            <Route path="/" element={user ? <Home correoUsuario={user.email} /> : <Text textAlign="center" color={textColor}>Por favor, inicie sesión</Text>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

// Envuelve `App` en `Router` aquí directamente
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
