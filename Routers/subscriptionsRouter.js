const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const checkPermissions = require ('../middleware/checkPermissions')
const {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
} = require('../DAL/subscriptionsAPI');

const subscriptionsRouter = express.Router();
subscriptionsRouter.use(authenticateToken);


//Entry Point 'http://localhost:8002/subscriptions'

subscriptionsRouter.route('/')
  .get(
    checkPermissions('viewSubscriptions'),
    async (req, res) => {
  try {
    const subscriptions = await getAllSubscriptions();
    res.json(subscriptions);
  } catch (error) {
    console.error('Failed to fetch subscriptions data', error);
    res.status(500).json({ error: 'Failed to retrieve subscriptions' });
  }
})
.post(
  checkPermissions('createSubscription'),
  async (req, res) => {
  try {
    const obj = req.body;
    const result = await addSubscription(obj);
    res.status(201).json(result);
  } catch (error) {
    console.error('Failed to create subscription', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

subscriptionsRouter.route('/:id')
  .get(
    checkPermissions('viewSubscriptions'),
    async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await getSubscriptionById(id);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (error) {
    console.error('Failed to fetch subscription data', error);
    res.status(500).json({ error: 'Failed to retrieve subscription' });
  }
})
  .put(
    checkPermissions('updateSubscription'),
    async (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  try {
    const result = await updateSubscription(id, obj);
    if (!result) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Failed to update subscription', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
})
  .delete(
    checkPermissions('deleteSubscription'),
    async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteSubscription(id);
    if (!result) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.sendStatus(204); // No content response
  } catch (error) {
    console.error('Failed to delete subscription', error);
    res.status(500).json({ error: 'Failed to delete subscription' });
  }
});

module.exports = subscriptionsRouter;
