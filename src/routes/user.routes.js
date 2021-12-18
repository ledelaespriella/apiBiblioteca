import { Router } from 'express';
import {
  register,
  login,
  getUser,
  update,
  remove,
  getBooks,
  prestamos
} from '../controller/user.controller';

import { authMiddleware } from './../middleware/auth.middleware';

const app = Router();

app.post('/login', login);
app.post('/register', register);
app.get('/user', authMiddleware , getUser);
app.put('/user/:userId', authMiddleware, update);
app.delete('/user/:userId', authMiddleware, remove);
app.get('/user/books', authMiddleware , getBooks);
app.put('/user/prestamo/:bookId',authMiddleware, prestamos);


export default app;