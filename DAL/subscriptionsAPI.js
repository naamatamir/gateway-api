const axios = require('axios');

const subscriptionsURL =`${process.env.CINEMA_BASE_URL}/subscriptions`;
  // 'http://localhost:8000/subscriptions';

const getAllSubscriptions = async () => {
  try {
    const response = await axios.get(subscriptionsURL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch subscriptions data', error);
    throw error;
  }
};

const getSubscriptionById = async (id) => {
  try {
    const response = await axios.get(`${subscriptionsURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch subscription with ID ${id}', error);
    throw error;
  }
};

const addSubscription = async (obj) => {
  try {
    const response = await axios.post(subscriptionsURL, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to create subscription', error);
    throw error;
  }
};

const updateSubscription = async (id, obj) => {
  try {
    const response = await axios.put(`${subscriptionsURL}/${id}`, obj);
    return response.data;
  } catch (error) {
    console.error('Failed to update subscription', error);
    throw error;
  }
};

const deleteSubscription = async (id) => {
  try {
    const response = await axios.delete(`${subscriptionsURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete subscription', error);
    throw error;
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
