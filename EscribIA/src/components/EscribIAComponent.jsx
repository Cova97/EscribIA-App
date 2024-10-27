import React, { useState } from 'react';
import { procesarTexto } from '../services/apiService';
import {
  Box,
  Button,
  Input,
  Textarea,
  Spinner,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const EscribIAComponent = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await procesarTexto(inputText);
      setCorrectedText(result.corrected_text);
      setScore(result.score);
    } catch (err) {
      setError('Error al procesar el texto. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para determinar el color basado en la calificación
  const getScoreColor = (score) => {
    if (score >= 7) {
      return 'green.500';
    } else if (score >= 4) {
      return 'yellow.500';
    } else {
      return 'red.500';
    }
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const cardBgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const buttonColor = useColorModeValue('teal.600', 'teal.400');

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg={bgColor} borderRadius="lg" boxShadow="xl" className="w-full">
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color={buttonColor} className="font-bold">
          EscribIA Procesador de Texto
        </Heading>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="inputText" color={textColor} fontWeight="bold">
              Ingresa tu texto
            </FormLabel>
            <Textarea
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe aquí tu texto para procesar"
              size="md"
              focusBorderColor={buttonColor}
              bg={cardBgColor}
              color={textColor}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            isLoading={isLoading}
            loadingText="Procesando"
            spinner={<Spinner />}
            className="mt-4"
          >
            Procesar Texto
          </Button>
        </form>

        {correctedText && (
          <Box mt={6} p={4} bg={cardBgColor} borderRadius="md" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
              Texto Corregido:
            </Text>
            <Text color={textColor}>{correctedText}</Text>

            <Text fontSize="lg" fontWeight="bold" mt={4} color={getScoreColor(score)}>
              Calificación: {score}/10
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default EscribIAComponent;
