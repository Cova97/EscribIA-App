import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const auth = getAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "El nombre completo es requerido";
    if (!email.trim()) newErrors.email = "El correo electrónico es requerido";
    if (!password) newErrors.password = "La contraseña es requerida";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error en el registro",
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
            Registro
          </Heading>
          
          <FormControl isInvalid={errors.fullName}>
            <FormLabel>Nombre completo</FormLabel>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
              padding={4}
            />
            <FormErrorMessage>{errors.fullName}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
              padding={4}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
              padding={4}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel>Confirmar contraseña</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500"
              padding={4}
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            w="full"
            className="hover:bg-blue-600 transition ease-in-out duration-300"
          >
            Registrarse
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterForm;
