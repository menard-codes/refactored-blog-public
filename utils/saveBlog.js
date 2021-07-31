import { firestore, firebase } from 'app/firebaseApp';
import axios from 'axios';


export async function saveBlog (status, title, mdBlog, avatar, authorName, ownerId) {
    const parsedBlog = await axios.post('/api/parse-md', {data: {markdown: mdBlog}});
    const imageStyle = `
        <style>
            img {
                width: 100%;
            }
        </style>
    `;

    const blogData = {
        title,
        html: `${parsedBlog.data.data}\n${imageStyle}`,
        status,
        avatar,
        authorName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ownerId
    };

    // save to firestore
    const docRef = await firestore.collection('blogs').add(blogData);
    // get id to redirect to blog post
    const { id } = docRef;
    return id;
};
