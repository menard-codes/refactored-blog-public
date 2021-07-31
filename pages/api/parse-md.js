import sanitize from 'sanitize-html';
import marked from 'marked';


export default function parseMd(req, res) {
    if (req.method === 'POST') {
        try {            
            const { markdown } = req.body.data;
            const data = sanitize(marked(markdown), {allowedTags: sanitize.defaults.allowedTags.concat(['img'])});
            res.send({msg: 'received', data});
        } catch (error) {
            console.log(error);
            res.send({msg: 'There was a problem', error: error.message});
        } finally {
            res.end();
        }
    } else {
        res.send({msg: 'Invalid Request'});
        res.end();
    }
}
