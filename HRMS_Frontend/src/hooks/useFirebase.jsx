import { useContext } from 'react';
import { FirebaseContext } from '../context/firebasecontext.jsx';

export const useFirebase = () => useContext(FirebaseContext);
