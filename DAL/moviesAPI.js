const axios = require('axios');

const moviesURL = `${process.env.CINEMA_BASE_URL}/movies`;
  // 'http://localhost:8000/movies';

const getAllMovies = async () => {
  try {
    const response = await axios.get(moviesURL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movies data', error);
    throw error;
  }
};

const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${moviesURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movie with ID ${id}', error);
    throw error;
  }
};

const addMovie = async (obj) => {
  try {
    const response = await axios.post(moviesURL, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to create movie', error);
    throw error;
  }
};

const updateMovie = async (id, obj) => {
  try {
    const response = await axios.patch(`${moviesURL}/${id}`, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to update movie', error);
    throw error;
  }
};

const deleteMovie = async (id) => {
  try {
    const response = await axios.delete(`${moviesURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete movie', error);
    throw error;
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
