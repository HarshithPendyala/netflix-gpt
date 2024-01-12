import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";





const Login = () => {
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    

    const handleSignUpToggle = () =>{
        setIsSignUpForm(!isSignUpForm);
    }
    console.log(isSignUpForm);
    const handleFormSubmit = () => {
        const result = checkValidData(email.current.value,password.current.value);
        setErrorMessage(result);
        
        if(result) return;
        
        if(isSignUpForm){
            //sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName:name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    setErrorMessage(error.message);
                  });
                
            })
            .catch((error) => {
                //console.log(error.code + "-" + error.message);
                setErrorMessage(error.code + "-" + error.message)
            })
        }
        else{
            //sign-in Logic
            console.log("sign In Logic");
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                setErrorMessage(error.message)
                //console.log(error.code + "-" + error.message);
            })
        }
    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img 
            className=''
            src='https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='bg-img' />
        </div>
        
        <form className="absolute bg-black/80 mx-auto left-0 right-0 px-12 py-14 my-28 w-3/12 h-fit text-white" onSubmit={(e) => e.preventDefault()}>
            <h3 className='py-4 font-bold text-3xl'>{ !isSignUpForm ? "Sign In" : "Sign Up"}</h3>
            {isSignUpForm && <input type='text' placeholder='Username' ref={name} className='p-4 my-4 w-full bg-zinc-800 rounded-md' />}
            <input type='email' ref={email} placeholder='Email or Phone number' className={`p-4  w-full bg-zinc-800 rounded-md ${errorMessage.includes("email") ? "border-b-2 border-orange-400" : ""}`} />
            {errorMessage.includes("email") ? <p className='text-sm text-orange-400'>{errorMessage}</p> :""}
            <input type='password' ref={password} placeholder='Password' className={`p-4 mt-6 w-full bg-zinc-800 rounded-md ${errorMessage.includes("password") ? "border-b-2 border-orange-400" : ""} `} />
            {errorMessage.includes("password") ? <p className='text-sm text-orange-400'>{errorMessage}</p> : ""}
            <p className='text-sm font-bold text-red-700'>{errorMessage}</p>
            <button className='bg-red-700 w-full p-4 my-4 rounded-md font-semibold' onClick={handleFormSubmit}>{ !isSignUpForm ? "Sign In" : "Sign Up"}</button>
            <p className='font-semibold cursor-pointer' onClick={handleSignUpToggle}>{!isSignUpForm ? "Not a user? Sign Up now." : "Already a user? Sign In..."}</p>
        </form>
         
       

    </div>
  )
}

export default Login