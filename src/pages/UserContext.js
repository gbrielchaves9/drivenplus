import React, { useState } from 'react';

export const UserContext = React.createContext({
  user: (""),
  setUser: () => {},
  membership: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [membership, setMembership] = useState(null); 

  return (
    <UserContext.Provider value={{ user, setUser, membership, setMembership }}> // incluir o estado do campo "membership" no valor do contexto
      {children}
    </UserContext.Provider>
  );
};