import React from 'react';
import DetailsStyle from 'components/widgets/UserDetails.module.css';


function UserDetails({
    photoURL,
    displayName,
    email,
    emailVerified
}) {
    return (
        <div className={DetailsStyle.container}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={photoURL}
                alt="User Photo"
                height={100}
                width={100}
                className={DetailsStyle.img}
            />
            <h1 className={DetailsStyle.minimalMargin}>{displayName}</h1>
            <p className={DetailsStyle.minimalMargin}>{email}</p>
            <p className={DetailsStyle.minimalMargin, DetailsStyle.verifiedFont}>{emailVerified ? 'Verified' : ''}</p>
        </div>
    );
}

export default UserDetails;
