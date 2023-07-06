import React, { createContext, useEffect, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../src/css/App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Erropage";
import Logout from "./components/Logout";
import Edit from "./components/Edit";
import Experience from "./components/Experience";
import { initialState, reducer } from "./reducer/UseReducer";
import Profile from "./components/Profile";
import RotateLoader from "react-spinners/RotateLoader";
import AboutUs from "./components/AboutUs";
import SearchResultsPage from "./components/SearchResultsPage";
import UserProfile from "./components/UserProfile";


//1: contextApi
export const UserContext = createContext();
  const Routing = ()=>{
    return(
      <switch>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/Logout" element={<Logout />} />
        <Route exact path="/Edit" element={<Edit />} />
        <Route exact path="/Experience" element={<Experience />} />
        <Route exact path="/search-results" element={<SearchResultsPage />} />
        <Route exact path="/users/user/:userId" element={<UserProfile />} />
        
        <Route exact path="*" element={<Error />} />
      </Routes>
      </switch>
    )
  }

const App = ()=>{
  const [loading, setLoading] = useState(true);
  
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
  
    // Wait for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if(loading){
    return (
      <section className="section loading">
        <RotateLoader color='#36d7b7' className='loader' ></RotateLoader>
        </section>
    )
  } 
  
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App;