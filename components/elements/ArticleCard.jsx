import React from 'react';
import Link from 'next/link';

import ArticleCardStyle from './ArticleCard.module.css';


function ArticleCard({ title, summary, author, date, blogId }) {
    return (
        <article className={ArticleCardStyle.card}>
            <Link href={`/blog/${blogId}`}>
                <a>
                    <h1 className={ArticleCardStyle.title}>{title}</h1>
                    <p className={ArticleCardStyle.summary}>{summary}</p>
                    <hr className={ArticleCardStyle.line} />
                    Author: <cite className={ArticleCardStyle.greyFont}>{author}</cite>
                </a>
            </Link>
            <time className={ArticleCardStyle.greyFont}>{date}</time>
        </article>
    );
}

export default ArticleCard;
