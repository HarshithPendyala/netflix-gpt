import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from './components/Login';

import Browse from './components/Browse';
import { useEffect } from 'react';
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import { auth } from './utils/firebase';



function App() {
  const dipatch = useDispatch();
    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dipatch(addUser({email: email, uid: uid, displayName: displayName}))
        // ...
      } else {
        // User is signed out
        // ...
        dipatch(removeUser());
      }
    });
  },[]) 
  

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Login />
    },
    {
      path:"/browse",
      element: <Browse />
    }
  ])
  return (
    <div>   
     
       <RouterProvider router={appRouter} /> 
     
    </div>
  );
}

export default App;
