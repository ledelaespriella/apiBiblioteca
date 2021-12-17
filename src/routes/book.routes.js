import { Router } from 'express';
import {
  index,
  save,
  show,
  update,
  remove,
} from '../controller/book.controller';

import { authMiddleware } from './../middleware/auth.middleware';

const app = Router();

app.get('/book', authMiddleware, show);
app.post('/book', authMiddleware, save);
app.get('/book/:bookId', authMiddleware, index);
app.put('/book/:bookId', authMiddleware, update);
app.delete('/book/:bookId', authMiddleware, remove);

export default app;