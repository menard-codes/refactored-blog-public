import Head from 'next/head';
import { useRouter } from 'next/router';

import { auth, firebase } from 'app/firebaseApp';
import { uiconfig } from 'config/firebaseAuth.config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loading from 'components/elements/Loading';
import Error from 'components/elements/Error';

import LoginStyle from 'styles/Login.module.css';


function Login() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;
    else if (error) <Error />;
    else if (user) {
        // user already logged in, redirect to home
        router.push('/');
        return <h1 style={{textAlign: 'center', color: 'black'}}>Redirecting...</h1>;
    }

    const authUiConfig = uiconfig(firebase);

    return (
        <div className={LoginStyle.body}>
            <div className={LoginStyle.container}>
                <Head>
                    <title>LogIn | Refactored</title>
                    <link rel="icon" href="/favicon.png" />
                </Head>
                <header className={LoginStyle.header}>
                    <h1>
                        Login to <span className={LoginStyle.underlined}>Refactored</span>
                    </h1>
                </header>
                <main>
                    <StyledFirebaseAuth uiConfig={authUiConfig} firebaseAuth={auth} />
                </main>
            </div>
        </div>
    );
}

export default Login;
