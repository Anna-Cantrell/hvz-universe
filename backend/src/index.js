const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middleware to handle cookies JWT
server.express.use(cookieParser());

// decode the JWT so we can get user id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if(token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto request for further requests to access
    req.userId = userId;
  }
  next();
});

// 2. Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they arent logged in skip it
  if(!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name}'
  );
  req.user = user;
  next();
});

server.start({
  cors: {
    credentials: true,
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:7777",
      "http://localhost:7777/",
      "https://frontend.acantrell.now.sh",
      "https://frontend.acantrell.now.sh/",
      "https://hvzuniverse.com",
      "https://hvzuniverse.com/"
    ],
  },
}, deets => {
  console.log(`Server is now running on http://localhost:${deets.port}`);
});
