import axios from 'axios'
import { getToken } from './authdecode'
const backendURL = import.meta.env.VITE_BACKEND_URL

export async function apiCall(endpoint, method = 'GET', data = null) {
  try {
    // const token = localStorage.getItem('token') // Obtener el token del localStorage

    const config = {
      method,
      url: `${backendURL}/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}) // Agregar token si existe
      },
      ...(data ? { data } : {}) // Incluir datos si existen
    }

    const response = await axios(config)
    return response.data // Retornar solo los datos en JSON
  } catch (error) {
    console.error('Error en apiCall:', error)
    throw error // Lanzar error para manejarlo en los llamados
  }
}