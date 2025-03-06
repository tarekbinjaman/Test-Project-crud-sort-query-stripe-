import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase.init'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(false)
        return signOut(auth)
    }
    const googleSignin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        setUser,
        userLogin,
        logOut,
        googleSignin,
        userRegister
    }
    useEffect(() => {
        const unsbscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsbscribe();
        }
    }, [])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;