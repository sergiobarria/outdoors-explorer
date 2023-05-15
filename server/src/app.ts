import express from 'express';
import config from 'config';

import { envs } from './constants';
import { morganMiddleware } from './middleware';

export const app = express();

const NODE_ENV = config.get<string>('NODE_ENV');

// ===== Apply middlewares 👇🏼 =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === envs.DEVELOPMENT) {
    app.use(morganMiddleware);
}

// ===== Apply routes 👇🏼 =====

// Not found route handler

// ===== Apply global error handler 👇🏼 =====
