import { WebhookBody } from './webhook.request.dto';
import { ActionCreatedData } from './action-created.request.dto';
import * as actionRepository from './action-created.repository';

export const isActionCreated = (body: WebhookBody<any>): body is WebhookBody<ActionCreatedData> => {
    return body.data.type === 'actions';
};

export const handleActionCreated = async (body: WebhookBody<ActionCreatedData>) => {
    return actionRepository.create(body.data.id, body);
};
