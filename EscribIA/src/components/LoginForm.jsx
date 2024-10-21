import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      maxWidth="400px" 
      margin="auto" 
      mt={8}
      className="bg-white p-6 shadow-lg rounded-lg"
      boxShadow="2xl"
      borderRadius="lg"
      padding={6}
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" color="blue.500" className="text-2xl font-bold">
            Iniciar Sesión
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
              padding={4}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
              padding={4}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            w="full"
            className="hover:bg-blue-600 transition ease-in-out duration-300"
          >
            Iniciar Sesión
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
