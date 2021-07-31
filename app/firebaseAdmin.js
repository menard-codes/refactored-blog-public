import * as admin from 'firebase-admin';
import serviceAccount from 'path/to/private-key';


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const adminFirestore = admin.firestore();

export {admin};
