import { adminFirestore } from 'app/firebaseAdmin';
import summarizeBlog from 'utils/summarizeBlog';
import moment from 'moment';

  /*
  algorithm:
    1. query firestore (order by date created, TODO: paginated: 25)
    2. filter: status published? pass if not
    3. map each document
      3.1. access:
        3.1.1. title
        3.1.2. html
        3.1.3. authorName
        3.1.4. Post time (moment js)
        3.1.5. document id
      3.2. Use Document ID as key prop for each article item
      3.3. Pass data to article card component


      */


export default async function retrieveFirestoreCollection() {
    const collectionSortedQuery = adminFirestore.collection('blogs').orderBy('createdAt', 'desc');

    try {        
        // TODO: For pagination: the limit can be accessed with query. might also work with collectionref
        const querySnapshot = await collectionSortedQuery.get();
        let docs = querySnapshot.docs;
        docs.forEach(docSnapshot => console.log(docSnapshot.get('status')));
        docs = docs.filter(docSnapshot => docSnapshot.get('status') === 'published').map(docSnapshot => {
            // retrieve data
            let {title, html, authorName, createdAt} = docSnapshot.data();
            // get doc id
            const {id} = docSnapshot;
            // summarize html
            html = summarizeBlog(html);
            // transform timestamp
            createdAt = moment.unix(createdAt.seconds).fromNow();
            return {title, html, authorName, createdAt, id};
        });
        return {docs};
    } catch (error) {
        return {error};
    }
}
