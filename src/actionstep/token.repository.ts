import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore();

const token = () => firestore.collection('actionstep-dev').doc('access-token');

export const get = () => {
    return token().get();
};

export const set = (data: any) => {
    return token().set(data);
};
