// import indexRouter from './index.js';
import roomsRouter from './routes/roomsRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

export default function route(app) {
  app.use('/rooms', roomsRouter);
  app.use('/category', categoryRouter);
  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
}

