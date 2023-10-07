import { firestore } from '../firestore.service';

const actionCollection = () => {
    return firestore.collection('actionstep-dev').doc('data').collection('action');
};

export const create = async (id: string, data: any) => {
    return actionCollection().doc(id).set(data);
};
