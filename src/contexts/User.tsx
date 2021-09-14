import React, { useState, createContext } from 'react';

interface IUserProps{
  user: {email: string | null, uid: string | null};
  dispatch: ({}) => void;
}

const UserContext = createContext<IUserProps>({
  user: { email: null, uid: null },
  dispatch: ({}) => {},
});


const UserProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState({email: null, uid: null});
  const dispatch = ({ email, uid }: any) => {
    if(email && uid){
      setUser({ email, uid });
    } else{
      setUser({ email: null, uid: null});
    }
  };

  const value = { user, dispatch };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };