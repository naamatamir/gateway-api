const express = require('express');
const {
  getAllAuthUsers,
  getAuthUserById,
  addAuthUser,
  updateAuthUser,
  deleteAuthUser,
} = require('../DAL/authUsersAPI');

const authUsersRouter = express.Router();

//Entry Point 'http://localhost:8002/authUsers'

authUsersRouter.route('/').get(async (req, res) => {
  try {
    const authUsers = await getAllAuthUsers();
    res.json(authUsers);
  } catch (error) {
    console.error('Failed to fetch authUsers data', error);
    res.status(500).json({ error: 'Failed to retrieve authUsers' });
  }
});

authUsersRouter.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const authUser = await getAuthUserById(id);
    if (!authUser) {
      return res.status(404).json({ error: 'AuthUser not found' });
    }
    res.json(authUser);
  } catch (error) {
    console.error('Failed to fetch authUser data', error);
    res.status(500).json({ error: 'Failed to retrieve authUser' });
  }
});

authUsersRouter.route('/').post(async (req, res) => {
  try {
    const obj = req.body;
    const result = await addAuthUser(obj);
    res.status(201).json(result);
  } catch (error) {
    console.error('Failed to create authUser', error);
    res.status(500).json({ error: 'Failed to create authUser' });
  }
});

authUsersRouter.route('/:id').patch(async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  try {
    const result = await updateAuthUser(id, obj);
    if (!result) {
      return res.status(404).json({ error: 'AuthUser not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Failed to update authUser', error);
    res.status(500).json({ error: 'Failed to update authUser' });
  }
});

authUsersRouter.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteAuthUser(id);
    if (!result) {
      return res.status(404).json({ error: 'AuthUser not found' });
    }
    res.sendStatus(204); // No content response
  } catch (error) {
    console.error('Failed to delete authUser', error);
    res.status(500).json({ error: 'Failed to delete authUser' });
  }
});

module.exports = authUsersRouter;
