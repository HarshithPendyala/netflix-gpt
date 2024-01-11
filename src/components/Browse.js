import React from 'react'
import {signOut} from 'firebase/auth';
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';

const Browse = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
   signOut(auth).then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <div>
      <div className=' flex justify-between'>
      <div className=' w-screen py-8 px-2 bg-gradient-to-r from-black z-10'>
          <img 
              className='w-44'
              src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='logo' />
      </div>
      <div className="flex my-10 mx-2 w-48 h-12 ">
        <img className='p-0.5'
        src="https://occ-0-2663-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e" alt='user-img' />
        
        <button className="p-2.5  text-white bg-red-500 border rounded-md shadow-sm outline-none appearance-none" onClick={handleSignOut}>
          Sign-Out
        </button>
      </div>
    </div>
    </div>
  )
}

export default Browse