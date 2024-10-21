import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Container,
  Avatar,
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";

import EscribIAComponent from "./EscribIAComponent";

const Home = ({ correoUsuario }) => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h1" size="xl">
              Bienvenido a EscribIA
            </Heading>
            <HStack>
              <Avatar name={correoUsuario} src="https://bit.ly/broken-link" />
              <Text>{correoUsuario}</Text>
              <Button colorScheme="red" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </HStack>
          </Flex>

         <Box>
            <Heading as="h2" size="lg" mb={4}>
                Procesador de Texto
            </Heading>
            <HStack spacing={4}>
                <EscribIAComponent />
            </HStack>
          </Box>

          
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;