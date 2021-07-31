import { useState, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { auth } from 'app/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';

import axios from 'axios';

import Navbar from 'components/elements/Navbar';
import UserDetails from 'components/widgets/UserDetails';
import Loading from 'components/elements/Loading';
import Error from 'components/elements/Error';

import UserStyle from 'styles/[uid].module.css';


export default function User() {
    const router = useRouter();
    const { uid } = router.query;
    const [usr, setUsr] = useState({});

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        axios.get(`/api/get-user-info/${uid}`).then(data => {
            setUsr(data.data.user);
        });
    }, [uid]);

    if (loading) return <Loading />;
    else if (error) return <Error msg={error.message} />;

    // if own profile, just use the local data
    if (user && user.uid === uid) {
        return <MainPage user={user} auth={auth} requester={user} />;
    } else if (usr) {
        return <MainPage user={usr} auth={auth} requester={user} />;
    }

    return <Loading />;
}


function MainPage({user, auth, requester}) {
    const {
        photoURL,
        displayName,
        email,
        emailVerified
    } = user;

    return (
        <div className={UserStyle.body}>
            <Head>
                <title>{displayName}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Navbar user={requester} auth={auth} />
            <main className={UserStyle.container}>
                <div className={UserStyle.cover}></div>
                <UserDetails
                    photoURL={photoURL}
                    displayName={displayName}
                    email={email}
                    emailVerified={emailVerified}
                />
            </main>
        </div>
    );
}
