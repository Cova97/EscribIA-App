import React, { useState } from 'react';
import { procesarTexto } from '../services/apiService';

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

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">EscribIA Procesador de Texto</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="5"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ingresa tu texto aquí..."
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? 'Procesando...' : 'Procesar Texto'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {correctedText && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Texto Corregido:</h2>
          <p className="bg-gray-100 p-3 rounded">{correctedText}</p>
        </div>
      )}

      {score !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Puntuación:</h2>
          <p className="text-2xl font-bold">{score}</p>
        </div>
      )}
    </div>
  );
};

export default EscribIAComponent;