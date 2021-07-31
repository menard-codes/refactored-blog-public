import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrevStyle from 'components/widgets/PreviewBlog.module.css';


// TODO: Try useSWR for data fetching
function PreviewBlog({ blogMd }) {
    const [blog, setBlog] = useState(blogMd);
    const imgStyle = `
        <style>
            img {
                width: 100%;
                height: auto;
                border-radius: 8px;
            }
        </style>
    `;

    useEffect(() => {
        axios.post('/api/parse-md', {data: {markdown: blogMd}}).then(res => {
            setBlog(res.data.data);
        }).catch(() => {});
    }, []);

    return (
        <div className={PrevStyle.container} dangerouslySetInnerHTML={{__html: `${blog}\n${imgStyle}`}}>
        </div>
    );
}

export default PreviewBlog;
