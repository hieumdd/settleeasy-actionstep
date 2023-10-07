import express from 'express';
import { http } from '@google-cloud/functions-framework';

import { logger } from './logging.service';
import { exchangeCodeForToken, getAuthorizationURL } from './actionstep/auth.service';
import { isActionCreated, handleActionCreated } from './webhook/action-created.service';

const app = express();

app.use(({ headers, path, body }, _, next) => {
    logger.info({ headers, path, body });
    next();
});

app.get('/authorize/callback', ({ query }, res) => {
    const { code } = query;

    if (!code) {
        res.status(400).end();
    }
    exchangeCodeForToken(<string>code)
        .then((result) => res.status(200).json({ result }))
        .catch((error) => {
            logger.error({ error });
            res.status(500).json({ error });
        });
});

app.get('/authorize', (_, res) => {
    res.redirect(getAuthorizationURL());
});

app.post('/', ({ body }, res) => {
    if (isActionCreated(body)) {
        handleActionCreated(body)
            .then((result) => res.status(200).json({ result }))
            .catch((error) => {
                logger.error({ error });
                res.status(500).json({ error });
            });
        return;
    }

    res.status(200).json({ ok: true });
});

http('main', app);
