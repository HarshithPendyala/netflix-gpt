import React, { useEffect } from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NetflixLogo, UserLogo } from '../utils/constants';


const Header = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const user = useSelector(store => store.user);

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
     
      <div className='absolute w-screen pl-16 pt-4 bg-gradient-to-b from-black z-10 flex justify-between bg-transparent'>
          <img 
              className='w-40'
              src={NetflixLogo} alt='logo' />
          {user && <div className='flex w-44 h-12 my-2'>
          <img className='p-0.5'
              src={UserLogo} alt='user-img' />
                
          <button className="px-4 ml-1 font-bold text-red-500 border border-red-500 rounded-md shadow-sm hover:bg-red-500 hover:text-white" onClick={handleSignOut}>
            Sign-Out
          </button>
          </div>}
      </div> 
     
    </>
  )
}

export default Header