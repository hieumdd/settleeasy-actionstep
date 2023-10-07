export type WebhookBody<D extends object> = {
    data: { type: string; id: string } & D;
};

export type WebhookBoolean = 'T' | 'F';
