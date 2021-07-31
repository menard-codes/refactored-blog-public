import { admin } from 'app/firebaseAdmin';


export default async function getUSerInfo(req, res) {
    if (req.method === 'GET') {
        const {uid} = req.query;
        try {
            const user = await admin.auth().getUser(uid);
            res.send({msg: 'received!', user});
        } catch (error) {
            res.send({msg: 'there was a problem', error});
        } finally {
            res.end();
        }
    } else {
        res.send({msg: 'Invalid Request'});
        res.end();
    }
}
