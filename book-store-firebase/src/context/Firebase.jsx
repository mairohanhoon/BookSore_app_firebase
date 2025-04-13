import {createContext, useContext} from 'react'
import {initializeApp} from 'firebase/app'

const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: "AIzaSyDRjJT_FGjT_iIz42e33ViHrq_LEASMKZU",
  authDomain: "bookify-f9ccc.firebaseapp.com",
  projectId: "bookify-f9ccc",
  storageBucket: "bookify-f9ccc.firebasestorage.app",
  messagingSenderId: "1056804193607",
  appId: "1:1056804193607:web:56d78af101e53ef82ff862"
};

const firebaseApp = initializeApp(firebaseConfig);

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

export const FirebaseProvider = (props) => {
    return (
        <FirebaseContext.Provider>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContext;
