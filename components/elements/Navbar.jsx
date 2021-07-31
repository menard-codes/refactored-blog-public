import { useState } from 'react';

import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Logo from 'components/elements/Logo';

import NavStyles from 'components/elements/Navbar.module.css';


function Navbar({ user, auth }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous" />
            </Head>
            <nav className={NavStyles.nav}>
                <header className={NavStyles.main}>
                    <Link href="/">
                        <a>
                            <Logo />
                        </a>
                    </Link>
                    <div onClick={() => setOpen(!open)} className={open ? NavStyles.hamburger : NavStyles.hamburgerActive}>
                        <i className="fas fa-bars fa-2x"></i>
                    </div>
                </header>
                <div className={open ? NavStyles.userRelatedContainer : NavStyles.menuClose}>
                    {
                        user ? (
                            // user is signed in
                            <>
                                {
                                    router.pathname !== '/write-blog' && (
                                        <Link href="/write-blog">
                                            <a className={NavStyles.link}>Write Blog</a>
                                        </Link>    
                                    )
                                }
                                <hr className={NavStyles.line} />
                                <div className={NavStyles.btnContainer}>
                                    <button className={NavStyles.signOutBtn} onClick={() => auth.signOut()}>Sign Out</button>
                                </div>
                                <hr className={NavStyles.line} />
                                <div>
                                    {/* TODO: Learn how to load image */}
                                    <Link href={`/user/${user.uid}`}>
                                        <a>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={user.photoURL}
                                                alt="User Photo"
                                                className={NavStyles.img}
                                            />
                                            <p className={NavStyles.uname}>{user.displayName}</p>
                                        </a>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            // user ain't signed in
                            <Link href={'/login'}>
                                <a className={NavStyles.signInBtn}>
                                    Sign In
                                </a>
                            </Link>
                        )
                    }
                </div>
            </nav>
        </>
    );
}

export default Navbar;
