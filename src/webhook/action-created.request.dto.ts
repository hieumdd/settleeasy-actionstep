import { WebhookBoolean } from './webhook.request.dto';

type Relationship = { data: { type: string; id: string } };

export type ActionCreatedData = {
    attributes: {
        name: string;
        reference: string | null;
        priority: number | null;
        status: string;
        statusTimestamp: string | null;
        isBillableOverride: WebhookBoolean | null;
        createdTimestamp: string | null;
        modifiedTimestamp: string | null;
        isDeleted: WebhookBoolean | null;
        deletedBy: string | null;
        deletedTimestamp: string | null;
        isFavorite: WebhookBoolean | null;
        overrideBillingStatus: string | null;
        lastAccessTimestamp: string | null;
    };
    relationships: {
        assignedTo: Relationship | null;
        division: Relationship | null;
        actionType: Relationship | null;
        primaryParticipants: Relationship | null;
        step: Relationship | null;
        billSettings: Relationship | null;
        relatedActions: Relationship | null;
    };
};
