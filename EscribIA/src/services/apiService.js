import axios from 'axios';

const API_URL = 'https://escribia-api.onrender.com/procesar_texto';

export const procesarTexto = async (texto) => {
  try {
    const response = await axios.post(API_URL, { text: texto });
    return response.data;
  } catch (error) {
    console.error('Error al procesar el texto:', error.response || error.message || error);
    throw error;
  }
};

// Puedes agregar más funciones de servicio aquí si la API se expande en el futuro