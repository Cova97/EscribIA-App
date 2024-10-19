// src/components/RegisterForm.jsx
import { useState } from "react";
import { Box, Button,FormControl,FormLabel,Input,InputGroup,InputRightElement,Stack,Text,Alert,AlertIcon,useToast } from "@chakra-ui/react";
import { registerUser } from "../services/authService"; // Servicio de registro desde authService.js

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un carácter especial."
      );
      return;
    }

    try {
      const user = await registerUser(email, password);
      toast({
        title: "Usuario registrado.",
        description: "Registro exitoso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Error al registrar: " + error.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="md">
      <Text fontSize="2xl" mb={4} textAlign="center">
        Registro de Usuario
      </Text>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Stack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirmar Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <Button colorScheme="teal" onClick={handleRegister}>
          Registrarse
        </Button>
      </Stack>
    </Box>
  );
}
