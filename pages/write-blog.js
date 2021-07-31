import React, { useState } from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { saveBlog } from 'utils/saveBlog';

import { auth } from 'app/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';

import PreviewBlog from 'components/widgets/PreviewBlog';
import ImageUpload from 'components/widgets/ImageUpload';
import Error from 'components/elements/Error';
import Loading from 'components/elements/Loading';
import Navbar from 'components/elements/Navbar';

import WriteBlogStyles from 'styles/WriteBlog.module.css';


// TODO: Auth in firestore and storage
// TODO: Better loading, error, redirect components
// TODO: Add loading: preview/edit, publish/draft
// TODO: Actually just an improvement, add gray-matter, to add meta-data for SEO and things like that
function WriteBlog() {
    const [blogMd, setBlogMd] = useState('');
    const [onEdit, setOnEdit] = useState(true);
    const [err, setErr] = useState('');
    const [title, setTitle] = useState('');
    const router = useRouter();

    const [user, loading, error] = useAuthState(auth);

    // TODO: Improve this
    if (loading) return <Loading />;
    else if (error) return <Error msg={error} />;

    else if (user) {
        const handleSave = async saveStatus => {
            if (blogMd.length >= 5) {
                try {
                    // call the util function
                    const uploadedBlogId = await saveBlog(saveStatus, title, blogMd, user.photoURL, user.displayName, user.uid);
                    // redirect to blog
                    router.push(`/blog/${uploadedBlogId}`);
                } catch (error) {
                    setErr(error.message);
                }
            } else {
                setErr('Invalid Blog. Must have at least 5 characters.');
            }
            setTimeout(() => setErr(''), 5000);
        };
    
        return (
            <div className={WriteBlogStyles.body}>
                <Head>
                    <title>Write Blog</title>
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <Navbar user={user} auth={auth} />
                <main className={WriteBlogStyles.container}>
                    <header>
                        <h1 className={WriteBlogStyles.header}>Write your Blog</h1>
                    </header>

                    <div className={WriteBlogStyles.btnGroup}>
                        <button className={WriteBlogStyles.blkBtn} onClick={() => handleSave('published')}>Publish</button>
                        <button className={WriteBlogStyles.btn} onClick={() => handleSave('draft')}>Draft</button>
                        <button className={WriteBlogStyles.btn} onClick={() => setOnEdit(!onEdit)}>{onEdit ? 'Preview' : 'Edit'}</button>
                    </div>

                    <ImageUpload />
                    {onEdit ? '' : <hr className={WriteBlogStyles.line} />}

                    {err && <Error msg={err} />}
                    {
                        onEdit ? (
                            // on edit
                            <>
                                <input
                                    placeholder="Write title here..."
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className={WriteBlogStyles.title}
                                />
                                <p><strong>Pssst...</strong> Use Markdown Syntax 😉</p>
                                <textarea placeholder="Write your thoughts here..." className={WriteBlogStyles.textarea} value={blogMd} onChange={e => setBlogMd(e.target.value)} />
                            </>
                        ) : (
                            // on preview
                            <PreviewBlog blogMd={`# ${title}\n${blogMd}`} />
                        )
                    }
                </main>
            </div>
        );
    }

    // TODO: Improve this too
    router.push('/login');
    return <h1>Redirecting...</h1>;
}

export default WriteBlog;
