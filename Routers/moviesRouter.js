const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const checkPermissions = require ('../middleware/checkPermissions')
const {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../DAL/moviesAPI');

const moviesRouter = express.Router();
moviesRouter.use(authenticateToken);

//Entry Point 'http://localhost:8002/movies'

moviesRouter.route('/')
  .get(
    checkPermissions('viewMovies'),
    async (req, res) => {
      try {
        const movies = await getAllMovies();
        res.json(movies);
      } catch (error) {
        console.error('Failed to fetch movies data', error);
        res.status(500).json({ error: 'Failed to retrieve movies' });
      }
    }
  )
  .post(
    checkPermissions('createMovie'),
    async (req, res) => {
      try {
        const obj = req.body;
        const result = await addMovie(obj);
        res.status(201).json(result);
      } catch (error) {
        console.error('Failed to create movie', error);
        res.status(500).json({ error: 'Failed to create movie' });
      }
    }
  );

moviesRouter.route('/:id')
  .get(
    checkPermissions('viewMovies'),
    async (req, res) => {
      const { id } = req.params;
      try {
        const movie = await getMovieById(id);
        if (!movie) {
          return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
      } catch (error) {
        console.error('Failed to fetch movie data', error);
        res.status(500).json({ error: 'Failed to retrieve movie' });
      }
    }
  )
  .patch(
    checkPermissions('updateMovie'),
    async (req, res) => {
      const { id } = req.params;
      const obj = req.body;
      try {
        const result = await updateMovie(id, obj);
        if (!result) {
          return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(result);
      } catch (error) {
        console.error('Failed to update movie', error);
        res.status(500).json({ error: 'Failed to update movie' });
      }
    }
  )
  .delete(
    checkPermissions('deleteMovie'),
    async (req, res) => {
      const { id } = req.params;
      try {
        const result = await deleteMovie(id);
        if (!result) {
          return res.status(404).json({ error: 'Movie not found' });
        }

        res.sendStatus(204);
      } catch (error) {
        console.error('Failed to delete movie', error);
        res.status(500).json({ error: 'Failed to delete movie' });
      }
    }
  );

module.exports = moviesRouter;



