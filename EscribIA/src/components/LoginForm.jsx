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
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const toast = useToast();
  const auth = getAuth();
  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Navegar al componente Home después de iniciar sesión
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

  const bgColor = useColorModeValue('white', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const buttonColor = useColorModeValue('blue.600', 'blue.400');

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Box maxW="md" w="full" bg={bgColor} p={8} borderRadius="lg" boxShadow="xl">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" color={buttonColor} className="font-bold">
            Ingrese a su cuenta
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormControl id="email" mb={4} isInvalid={emailError}>
              <FormLabel color={textColor} fontWeight="bold">Correo electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@ejemplo.com"
                focusBorderColor={buttonColor}
                bg={cardBgColor}
                color={textColor}
              />
            </FormControl>

            <FormControl id="password" mb={6} isInvalid={passwordError}>
              <FormLabel color={textColor} fontWeight="bold">Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  focusBorderColor={buttonColor}
                  bg={cardBgColor}
                  color={textColor}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    size="sm"
                    color={textColor}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isLoading}
              loadingText="Iniciando sesión..."
              className="mt-4"
            >
              Ingresar
            </Button>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginForm;
