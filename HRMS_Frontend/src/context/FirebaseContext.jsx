import { createContext, useContext } from 'react';

export const FirebaseContext = createContext({ user: null, userRole: 'HR' });

export const useFirebase = () => useContext(FirebaseContext);
