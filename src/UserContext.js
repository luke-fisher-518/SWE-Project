// UserContext.js
import React from 'react';

const UserContext = React.createContext({
    userImage: '',
    userName: '',
    accountName: '',
    inventory: [],
    recentActivity: [],
    setUserImage: () => {},
    setUserName: () => {},
    setAccountName: () => {},
    setInventory: () => {},
    setRecentActivity: () => {},
});

export default UserContext;