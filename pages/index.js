import { useState, useEffect } from 'react';
import Head from 'next/head';

import { auth } from 'app/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from 'components/elements/Navbar';
import ArticleCard from 'components/elements/ArticleCard';

import retrieveFirestoreCollection from 'utils/retrieveFirestoreDocuments';

import HomeStyle from 'styles/Home.module.css';
import Error from 'components/elements/Error';


export default function Home({ docs, error }) {
  const [user] = useAuthState(auth);

  return (
    <div className={HomeStyle.body}>
      <Head>
        <title>Refactored</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar user={user ? user : null} auth={auth} />
      <main className={HomeStyle.container}>
        <header>
          <h1>The Refactored Blog</h1>
        </header>
        <h3>What&apos;s new:</h3>

        {/* {loading && <Loading />} */}
        {error && (<Error msg={error.message} />)}
        {docs && (
          <ul className={HomeStyle.ul}>
            {docs.map(doc => (
              <li key={doc.id} className={HomeStyle.listItem}>
                {/* {title, html, authorName, createdAt, id}; */}
                <ArticleCard title={doc.title} summary={doc.html} author={doc.authorName} date={doc.createdAt} blogId={doc.id} />
              </li>
            ))}
          </ul>
        )}
        {/* EXAMPLE */}
        {/* <ArticleCard title="Lorem Ipsum" summary="lorem ipsum dolor sit amet consectetur" blogId="SVZ23LqBd0qRkGtk02gj" author="Menard Maranan" date="4 hours ago" /> */}
        {/* EXAMPLE */}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const {docs, error} = await retrieveFirestoreCollection();
  return {props: {docs: docs||null, error: error||null}};
}
