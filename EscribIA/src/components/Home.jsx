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
  Divider,
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

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("blue.600", "blue.400");

  return (
    <Box bg={bgColor} minH="100vh" py={10} px={4} className="flex flex-col items-center">
      <Container maxW="container.lg" bg={cardBgColor} borderRadius="lg" boxShadow="xl" p={8} className="w-full">
        <VStack spacing={8} align="stretch">
          <Flex justifyContent="space-between" alignItems="center" mb={4} className="w-full">
            <HStack spacing={4} className="items-center">
              <Avatar name={correoUsuario} size="lg" className="bg-blue-500" />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" color={textColor} fontSize="xl">
                  {correoUsuario}
                </Text>
                <Text color={textColor} fontSize="sm">
                  Usuario registrado
                </Text>
              </VStack>
            </HStack>
            <Button
              colorScheme="red"
              aria-label="Cerrar sesión"
              onClick={handleLogout}
              variant="outline"
              size="lg"
              className="ml-auto"
            >
              Cerrar sesión
            </Button>
          </Flex>

          <Divider borderColor={textColor} />

          <Box mt={8} textAlign="center" py={6} px={4} bg={cardBgColor} borderRadius="md" boxShadow="md" className="w-full">
            
            <HStack justifyContent="center" className="flex-wrap">
              <EscribIAComponent />
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
