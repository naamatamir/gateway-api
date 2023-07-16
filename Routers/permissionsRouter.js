const express = require('express');
const {
  getAllPermissions,
  getPermissionById,
  addPermission,
  updatePermission,
  deletePermission,
} = require('../DAL/permissionsAPI');

const permissionsRouter = express.Router();

//Entry Point 'http://localhost:8002/permissions'

permissionsRouter.route('/').get(async (req, res) => {
  try {
    const permissions = await getAllPermissions();
    res.json(permissions);
  } catch (error) {
    console.error('Failed to fetch permissions data', error);
    res.status(500).json({ error: 'Failed to retrieve permissions' });
  }
});

permissionsRouter.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const permission = await getPermissionById(id);
    if (!permission) {
      return res.status(404).json({ error: 'permission not found' });
    }
    res.json(permission);
  } catch (error) {
    console.error('Failed to fetch permission data', error);
    res.status(500).json({ error: 'Failed to retrieve permission' });
  }
});

permissionsRouter.route('/').post(async (req, res) => {
  try {
    const obj = req.body;
    const result = await addPermission(obj);
    res.status(201).json(result);
  } catch (error) {
    console.error('Failed to create permission', error);
    res.status(500).json({ error: 'Failed to create permission' });
  }
});

permissionsRouter.route('/:id').patch(async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  try {
    const result = await updatePermission(id, obj);
    if (!result) {
      return res.status(404).json({ error: 'permission not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Failed to update permission', error);
    res.status(500).json({ error: 'Failed to update permission' });
  }
});

permissionsRouter.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deletePermission(id);
    if (!result) {
      return res.status(404).json({ error: 'permission not found' });
    }
    res.sendStatus(204); // No content response
  } catch (error) {
    console.error('Failed to delete permission', error);
    res.status(500).json({ error: 'Failed to delete permission' });
  }
});

module.exports = permissionsRouter;
