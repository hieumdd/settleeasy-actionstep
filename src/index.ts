import express from 'express';
import { http } from '@google-cloud/functions-framework';

import { logger } from './logging.service';

const app = express();

app.use(({ headers, path, body }, _, next) => {
    logger.info({ headers, path, body });
    next();
});

app.use('/', (_, res) => {
    res.status(200).json({ ok: true });
});

http('main', app);
