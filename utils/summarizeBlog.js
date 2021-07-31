
export default function summarizeBlog(blogHtml) {
    const pTagPattern = /<p>.*<\/p>/s;
    const pTagRemovePattern = /(<p>|<\/p>)|<.*\/>/g;
    const matchNonSpace = /\S+/g;

    const extractFirstParagraph = blogHtml.match(pTagPattern);
    let firstMatch = extractFirstParagraph[0];
    firstMatch = firstMatch.replace(pTagRemovePattern, ''); // to remove the p tag
    firstMatch = firstMatch.match(matchNonSpace); // to split the string in spaces
    
    // get the first 20 words
    const summary = firstMatch.slice(0, 20).join(' ') + '...';
    return summary;
}
