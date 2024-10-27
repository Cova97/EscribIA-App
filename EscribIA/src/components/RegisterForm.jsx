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
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const auth = getAuth();
  const navigate = useNavigate(); // Hook de navegación

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "El nombre completo es requerido";
    if (!email.trim()) newErrors.email = "El correo electrónico es requerido";
    if (!password) newErrors.password = "La contraseña es requerida";
    if (password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
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
        displayName: fullName,
      });
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Navegar al componente Home después de registrarse
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

  const bgColor = useColorModeValue('white', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const buttonColor = useColorModeValue('green.600', 'green.400');

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Box maxW="md" w="full" bg={bgColor} p={8} borderRadius="lg" boxShadow="xl">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" color={buttonColor} className="font-bold">
            Registrarse
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={errors.fullName} mb={4}>
              <FormLabel color={textColor} fontWeight="bold">Nombre completo</FormLabel>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Juan Pérez"
                focusBorderColor={buttonColor}
                bg={cardBgColor}
                color={textColor}
              />
              <FormErrorMessage>{errors.fullName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email} mb={4}>
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
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} mb={4}>
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
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword} mb={6}>
              <FormLabel color={textColor} fontWeight="bold">Confirmar contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  focusBorderColor={buttonColor}
                  bg={cardBgColor}
                  color={textColor}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    size="sm"
                    color={textColor}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              width="full"
              isLoading={isLoading}
              loadingText="Registrando..."
              className="mt-4"
            >
              Registrarse
            </Button>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};

export default RegisterForm;
