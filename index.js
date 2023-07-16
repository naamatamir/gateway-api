const express = require('express');
const cors = require('cors');
require('dotenv').config();

const membersRouter = require('./Routers/membersRouter');
const moviesRouter = require('./Routers/moviesRouter');
const subscriptionsRouter = require('./Routers/subscriptionsRouter');
const authUsersRouter = require('./Routers/authUsersRouter');
const loginRouter = require('./Routers/loginRouter');
const registerRouter = require('./Routers/registerRouter');
const permissionsRouter = require('./Routers/permissionsRouter');

const app = express();
const port = process.env.PORT || 8002;

app.use(cors());
app.use(express.json());


// Routes to Subscriptions DB
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/subscriptions', subscriptionsRouter);

// Routes to Users DB
app.use('/authUsers', authUsersRouter);
app.use('/authUsers/login', loginRouter);
app.use('/authUsers/register', registerRouter);
app.use('/permissions', permissionsRouter);

app.listen(port, () => {
  console.log(`API Gateway is listening at http://localhost:${port}`);
});
