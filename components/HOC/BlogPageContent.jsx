import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import moment from 'moment';

import BlogContentStyle from 'components/HOC/BlogPageContent.module.css';


export default function BlogPageContent({value}) {
    const {title, html, createdAt, avatar, authorName, ownerId} = value;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <h1>{title}</h1>
            </header>
            <section className={BlogContentStyle.metaData}>
                <Image src={avatar} alt="Avatar" width={50} height={50} className={BlogContentStyle.avatar} />
                <div className={BlogContentStyle.dataGrouping}>
                    by <Link href={`/user/${ownerId}`}>
                        <a className={BlogContentStyle.author} target="_blank">
                            {authorName}
                        </a>
                    </Link>
                    <br />
                    {moment.unix(createdAt.seconds).fromNow()}
                </div>
            </section>
            <hr className={BlogContentStyle.line} />
            <main dangerouslySetInnerHTML={{__html: html}}></main>
        </>
    );
}