import React from 'react';

function Error({ msg }) {
    return (
        <h1 style={{textAlign: 'center', color: 'black'}}>
            Error: {msg}
        </h1>
    );
}

export default Error;
