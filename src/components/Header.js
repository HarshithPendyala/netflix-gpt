import React, { useEffect } from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
       navigate("/");
     })
     .catch((error) => {
       console.log(error);
     })
   }

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dipatch(addUser({email: email, uid: uid, displayName: displayName}))
        navigate('/browse')
      } else {
        // User is signed out
        // ...
        dipatch(removeUser());
        navigate('/');
      }
    });

    //insubscribe onAuthStateChanged when Header component unmounts
    return () => unsubscribe();
  },[])

  return (
    <>
     
      <div className='absolute w-screen py-8 px-2 bg-gradient-to-b from-black z-10 flex justify-between bg-transparent'>
          <img 
              className='w-44'
              src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='logo' />
          <div className='flex w-44 h-12'>
          <img className='p-0.5'
              src="https://occ-0-2663-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e" alt='user-img' />
                
          <button className="p-2.5  text-white bg-red-500 border rounded-md shadow-sm outline-none appearance-none" onClick={handleSignOut}>
            Sign-Out
          </button>
          </div>
      </div>
     
    </>
  )
}

export default Header