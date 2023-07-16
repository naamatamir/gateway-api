const axios = require('axios');

const permissionsURL = 'http://localhost:8001/permissions';

const getAllPermissions = async () => {
    try {
      const response = await axios.get(permissionsURL);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch permissions data', error);
      throw error;
    }
  };
  
  //*!check */
  const getPermissionById = async (id) => {
    try {
      const response = await axios.get(`${permissionsURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch permission with ID ${id}', error);
      throw error;
    }
  };
  
  const addPermission = async (obj) => {
    try {
      const response = await axios.post(permissionsURL, obj);
      return response.data;
    } catch (error) {
      console.error('Failed to create permission', error);
      throw error;
    }
  };
  
  const updatePermission = async (id, obj) => {
    try {
      const response = await axios.patch(`${permissionsURL}/${id}`, obj);
      return response.data;
    } catch (error) {
      console.error('Failed to update permission', error);
      throw error;
    }
  };
  
  const deletePermission = async (id) => {
    try {
      const response = await axios.delete(`${permissionsURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete permission', error);
      throw error;
    }
  };
  
  module.exports = {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission,
    deletePermission,
  };