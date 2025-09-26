import axios from 'axios';

// 영화 API용 (TMDB API)
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  }
});

// 챗봇 API용 (Flask 백엔드)
const chatApi = axios.create({
  baseURL: 'https://backendtpj-n70w.onrender.com',
  //baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
export { chatApi };