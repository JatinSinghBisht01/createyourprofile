import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css"
import { NavLink, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { UserContext } from "../App";
const Navbar = ()=>{
  const {state, dispatch} = useContext(UserContext);

    const [searchInput, setSearchInput] = useState("");
    const [result, setResult] = useState([{}]);
    const handleSearchInputChange = (e)=>{
      setSearchInput(e.target.value)
      console.log(searchInput);
    }
    
    const searchres = async()=>{
      try {
        const response = await fetch(`/api/users/${searchInput}`, {
          method:"GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await response.json();
        setResult(data);
       
        if(response.status === 400){
          console.log(`user not exist with username ${searchInput}`);
        }
        
        
      } catch (error) {
        
        console.log(error);
      }
     
    }
    console.log(result);

    // //filtering the repeative data.
    // const uniqueData = result.filter((item, index) => {
    //   return index === result.findIndex(obj => {
    //     return obj._id === item._id;
    //   });
    // });
    // console.log(uniqueData);
    useEffect(()=>{
      if(searchInput){
        searchres();
      }
     
    })
    const navigate = useNavigate();
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      
      navigate('/search-results', {
        state: {
          searchQuery: searchInput,
          searchResults: result
        }
      });
    };

  
  const RenderMenu = ()=>{
    if(state){
      return(
        <>
        
         <li className="nav-item">
          <NavLink className="nav-link "  to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/contact">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/aboutus">AboutUs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link"  to="/logout">Logout</NavLink>
        </li>
        </>
      )
    }else{
      return (
        <>  
            
           <li className="nav-item">
          <NavLink className="nav-link " to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/aboutus">AboutUs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Register</NavLink>
        </li>
        </>
      )
    }
  }

  return (
    <div className="nav-container fixed-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary " >
  <div className="container-fluid">
      
    <NavLink className="navbar-brand" href="/">
      createyourprofile.com
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <form class="form-inline my-2 my-lg-0 search" method="GET" onSubmit={handleSearchSubmit}>

          <input class="form-control mr-sm-2"  value={searchInput} onChange={e=>handleSearchInputChange(e)} type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0 "  type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          
      </form>
      <searchsubmit />
       <RenderMenu /> 
       
       
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;