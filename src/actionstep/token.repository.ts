import { DocumentData } from '@google-cloud/firestore';

import { firestore } from '../firestore.service';

const token = () => firestore.collection('actionstep-dev').doc('access-token');

export const get = async () => {
    return token()
        .get()
        .then((doc) => doc.data() as DocumentData);
};

export const set = async (data: any) => {
    return token().set(data);
};
