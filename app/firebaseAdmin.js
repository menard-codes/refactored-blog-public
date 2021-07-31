import * as admin from 'firebase-admin';
import serviceAccount from 'config/codeblog-cd897-firebase-adminsdk-ii6wb-77053931ae.json';


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const adminFirestore = admin.firestore();

export {admin};
