import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import initializeStrategy from './auth/PassportStrategy.js';
import connect from './config/database.js';

import route from './routes/routes.js';

// Connect db

connect();

const app = express();

const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(',')
    : [];
console.log(20, whitelist);
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(logger('dev'));
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

/*const __dirname = path.resolve(path.dirname(''));
app.use(express.static(path.join(__dirname, 'public')));*/

// passportJS authentication
initializeStrategy(app);

// Routing
route(app);

// initializeSocketIO(server);
export default app;
