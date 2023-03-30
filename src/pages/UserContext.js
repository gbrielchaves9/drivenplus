/*import React, { useState } from 'react';
import { createContext } from 'react';
export const UserContext = createContext(null);

export const UserContext = React.createContext({
  user: (""),
  setUser: () => {},
  membership: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [membership, setMembership] = useState(null); 

  return (
    <UserContext.Provider value={{ user, setUser, membership, setMembership }}> 
    </UserContext.Provider>
  );
};*/


import { createContext } from 'react';
const UserContext = createContext();
export default UserContext;

