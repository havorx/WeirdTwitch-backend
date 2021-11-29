// import indexRouter from './index.js';
import roomsRouter from './rooms.js';
import categoryRouter from './category.js';
import adminRouter from './admin.js';
import authRouter from './auth.js';
import userRouter from './user.js';

export default function route(app) {
  app.use('/rooms', roomsRouter);
  app.use('/category', categoryRouter);
  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);
  app.use('/user-detail', userRouter);
}

