// UserContext.js
import React from 'react';

const UserContext = React.createContext({
    userImage: '../img/user-img.svg',
    setUserImage: () => {},
});

export default UserContext;