import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import axios from "axios";

import useAxiosPublic from "../ReactHooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const [packs, setPacks] = useState(0);
  const [hrEmploy, setHrEmploy] = useState(0);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const usersInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", usersInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setLoading(true);
    // const { data } = await axios(
    //   `https://tasty-bites-server-site.vercel.app/logout`,
    //   {
    //     withCredentials: true,
    //   }
    // );
    // console.log(data);
    return signOut(auth);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    setLoading,
    loading,
    googleLogin,
    setPacks,
    packs,
    updateUserProfile,
    hrEmploy,
    setHrEmploy,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
