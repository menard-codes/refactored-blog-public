import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { firestore } from 'app/firebaseApp';


export default function useRetriveFirestoreData(documentId) {
    const docRef = firestore.doc(`blogs/${documentId}`);
    const [value, loading, error] = useDocumentDataOnce(docRef);
    return [value, loading, error];
}
