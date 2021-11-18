// import indexRouter from './index.js';
import logoutRouter from './logout.js';
import roomsRouter from './rooms.js';
import adminRouter from './admin.js';
import authRouter from './user.js';

export default function route(app) {
  app.use('/logout', logoutRouter);
  app.use('/rooms', roomsRouter);
  app.use('/admin', adminRouter);
  app.use('/user', authRouter);
}

