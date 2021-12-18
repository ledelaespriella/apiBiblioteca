import { Router } from 'express';
import {
  index,
  save,
  show,
  update,
  remove,
} from '../controller/book.controller';

// Autenticacion pendiente
// import { authMiddleware } from './../middleware/auth.middleware';

const app = Router();

app.get('/book', show);
app.post('/book', save);
app.get('/book/:bookId', index);
app.put('/book/:bookId', update);
app.delete('/book/:bookId', remove);

export default app;