import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import app from './../Firebase/firebase.config';


const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const googleSignUp = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }



    useEffect( () => {
        const unSubscribe=  onAuthStateChanged(auth, currentUser => {
            console.log("Current user", currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        } 
    }, [])

    
    const updateProfileInfo = (firstName, photo) => {
        return updateProfile(auth.currentUser, {
             displayName: firstName, photoURL: photo
           })
     }


     
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    const logout = () => {
        setLoading(false);
        return signOut(auth)
    }
    
    const userInfo = {
        user,
        signUp,
        login,
        loading,
        logout,
        googleSignUp,
        updateProfileInfo

    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;