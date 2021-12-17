import { Router } from 'express';
import {
  register,
  login,
  getUser
} from '../controller/user.controller';

import { authMiddleware } from './../middleware/auth.middleware';

const app = Router();

app.post('/auth/login', login);
app.post('/auth/register', register);
app.get('/auth', authMiddleware , getUser);

export default app;