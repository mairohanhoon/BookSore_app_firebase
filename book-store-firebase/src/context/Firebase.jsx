import {createContext, useContext, useState, useEffect} from 'react'
import {initializeApp} from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs, doc, getDoc} from 'firebase/firestore'

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
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if(user) setUser(user);
            else setUser(null);
        })
    }, [])

    const isLoggedIn = user ? true : false;

    const logOutUser = () => {
        signOut(firebaseAuth);
    }

    const signupUserEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinUserEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const signinWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider)
    }
    
    console.log(user);
    

    const handleCreateNewListing = async (name, isbn, price, coverPhotoURL) => {
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            coverPhotoURL,
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
    }

    const listAllBooks = async () => {
        return getDocs(collection(firestore, 'books'));
    }

    const getBookById = async (bookId) => {
        const docRef = doc(collection(firestore, 'books'), bookId);
        const result = await getDoc(docRef);
        return result;
    }

    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(firestore, 'books', bookId, 'orders');
        const result = await addDoc(collectionRef, {
            username : user.displayName,
            id : user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty,
        })
        return result;
    }

    return (
        <FirebaseContext.Provider value={{signupUserEmailAndPassword, signinUserEmailAndPassword, signinWithGoogle, isLoggedIn, handleCreateNewListing, listAllBooks, getBookById, logOutUser, placeOrder}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContext;
