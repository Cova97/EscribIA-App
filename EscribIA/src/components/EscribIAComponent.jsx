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

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} bg="white" rounded="lg" shadow="xl">
      <Heading as="h1" size="xl" mb={4} textAlign="center" color="teal.500">
        EscribIA Procesador de Texto
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="inputText">Ingresa tu texto</FormLabel>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe aquí tu texto para procesar"
            size="md"
            focusBorderColor="teal.500"
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
        >
          Procesar Texto
        </Button>
      </form>

      {correctedText && (
        <Box mt={6} p={4} bg="gray.50" borderRadius="md" shadow="md">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Texto Corregido:
          </Text>
          <Text>{correctedText}</Text>

          <Text fontSize="lg" fontWeight="bold" mt={4} color={getScoreColor(score)}>
            Calificación: {score}/10
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default EscribIAComponent;
