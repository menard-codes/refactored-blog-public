import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { auth } from 'app/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import useRetriveFirestoreData from 'hooks/retrieveFirestoreData';

import Navbar from 'components/elements/Navbar';
import BlogPageContent from 'components/HOC/BlogPageContent';
import Loading from 'components/elements/Loading';
import Error from 'components/elements/Error';

import BlogStyle from 'styles/BlogPage.module.css';


// TODO: Author Link, time posted, isPublished
export default function BlogPage() {
    const router = useRouter();
    const {id} = router.query;
    const [user] = useAuthState(auth);
    const [value, loading, error] = useRetriveFirestoreData(id);

    if (value && value.status === 'draft') {
        router.push('/');
        return <h1>Redirecting</h1>;
    }

    return (
        <div className={BlogStyle.body}>
            <Head>
                <title>Blog</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Navbar user={user} auth={auth} />
            <div className={BlogStyle.container}>
                {loading && <div className={BlogStyle.utils}><Loading /></div>}
                {error && <div className={BlogStyle.utils}><Error msg={error.message} /></div>}
                {(value && value.status === 'published') && <BlogPageContent value={value} />}
            </div>
        </div>
    );
}


