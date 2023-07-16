const checkPermission = (permission) => {
  return (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else if (req.user.permissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Insufficient permissions.' });
    }
  };
};

module.exports = checkPermission;
