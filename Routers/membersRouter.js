const express = require('express');
const {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
} = require('../DAL/membersAPI');

const membersRouter = express.Router();

//Entry Point 'http://localhost:8002/members'

membersRouter.route('/').get(async (req, res) => {
  try {
    const members = await getAllMembers();
    res.json(members);
  } catch (error) {
    console.error('Failed to fetch members data', error);
    res.status(500).json({ error: 'Failed to retrieve members' });
  }
});

membersRouter.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  try {
    const member = await getMemberById(id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Failed to fetch member data', error);
    res.status(500).json({ error: 'Failed to retrieve member' });
  }
});

membersRouter.route('/').post(async (req, res) => {
  try {
    const obj = req.body;
    const result = await addMember(obj);
    res.status(201).json(result);
  } catch (error) {
    console.error('Failed to create member', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
});

membersRouter.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  try {
    const result = await updateMember(id, obj);
    if (!result) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Failed to update member', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

membersRouter.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteMember(id);
    if (!result) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.sendStatus(204); // No content response
  } catch (error) {
    console.error('Failed to delete member', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

module.exports = membersRouter;
