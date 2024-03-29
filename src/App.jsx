
/* eslint-disable no-unused-vars */
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { LoginOutlined } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import './App.css'
import styled from 'styled-components'
import Footer from "./components/Footer";

const loadHome = () => import("./pages/Home");
const loadNav = () => import("./components/Navbar");
const loadTopbar = () => import("./components/Topbar");
const loadLogin = () => import("./pages/Login");

// eslint-disable-next-line react/prop-types, no-unused-vars




const Home = React.lazy(() => loadHome());
const Topbar = React.lazy(() => loadNav());
const Navbar = React.lazy(() => loadTopbar());
const Login = React.lazy(() => loadLogin());



function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        // Redirect to the main content or dashboard
        navigate('/'); // Update the path accordingly
      } else {
        setCurrentUser(null);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault()
    // if (window.confirm("Are you sure you want to log out?")) {
    signOut(auth)
      .then(() => {
        // Redirect to login page after logout
        navigate('/login')
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
    // }
  };
  return (

    <div>
      <Suspense fallback={<div>Loading...</div>}>
          {" "}
          {/* <Navbar /> */}
          {currentUser? (
            <>       
               <Topbar /> 

             <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          </Routes>
            </>
          ):<Login/>}
         
        {/* <CallbackComponent /> */}
        {/* <ExpensiveCalculationComponent/> */}
        <hr />
        <Footer/>
      </Suspense>
    </div>
  );
}


export default App;
