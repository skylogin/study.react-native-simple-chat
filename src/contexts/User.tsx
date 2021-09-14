import React, { useState, createContext } from 'react';

interface loginProp {
  email: string | null;
  uid: string | null;
}

interface IUserProps{
  user: {email: string | null, uid: string | null};
  dispatch: ({}: loginProp) => void;
}

const UserContext = createContext<IUserProps>({
  user: { email: null, uid: null },
  dispatch: ({}) => {},
});


const UserProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState({email: '', uid: ''});
  const dispatch = ({ email, uid }: loginProp) => {
    if(email && uid){
      setUser({ email, uid });
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