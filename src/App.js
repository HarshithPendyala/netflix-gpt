import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Login from './components/Login';

import Browse from './components/Browse';
import { useEffect } from 'react';
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import { auth } from './utils/firebase';



function App() {
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
