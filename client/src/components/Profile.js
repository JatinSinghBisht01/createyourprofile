import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../css/profile.css";
import profile from "../imgs/profile-img.jpg";
import {  NavLink, useNavigate } from "react-router-dom";
import pic from "../imgs/about-pic.jpg";
import RotateLoader from "react-spinners/RotateLoader";

const Profile = ()=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const callAboutPage = async() =>{
        try {
            const res = await fetch("/api/user/profile",{
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                    

                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            setUserData(data);
            setTimeout(() => {
                setLoading(false);
              }, 2000);
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
                
            }
            

        } catch (err) {
            console.log(err);
            navigate("/login");
        } 
    }
    
useEffect(()=>{
    callAboutPage();
},  []);

if(loading){
    return (
      <section className="section loading">
        <RotateLoader color='#36d7b7' className='loader' ></RotateLoader>
        </section>
    )
  } 

    return (
        <>
        <section className="section-container about">
        <div className="container mt-3" style={{height:"480px"}}>
          <div className="myCard">
            <form method="GET">
            <div className="row">
             
             <div className="col-md-4 left">
               <div className="box"> 
                   <figure>
                   <img className="signup-img" width="150px"  src={userData.name === "Jatin Bisht" ? profile : userData.image} alt="signup-img"></img>
                   </figure>
                   <div className="mt-3">
                     <h4>{userData.name}</h4>
                     <p className="text-secondary mb-1">{userData.work}</p>
                     <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
               
                   </div>
                 </div>
             </div>
             <div className="col-md-8 pl-5 about-info">
               <div className="right" >
                   <div className="tab-content profile-tab" id="myTabContent">
                       <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        
                           <div className="row">
                               <div className="col-md-6">
                                   <label>User ID</label>
                               </div>
                               <div className="col-md-6">
                                   <p>{userData._id}</p>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Name</label>
                               </div>
                               <div className="col-md-6">
                                   <p>{userData.name}</p>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Email</label>
                               </div>
                               <div className="col-md-6">
                                   <p>{userData.email}</p>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Phone</label>
                               </div>
                               <div className="col-md-6">
                                   <p>{userData.phone}</p>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Profession</label>
                               </div>
                               <div className="col-md-6">
                                   <p>{userData.work}</p>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Organisation</label>
                               </div>
                               <div className="col-md-6">
                                   <p>{userData.organisation}</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <span>
                   <NavLink type="submit" className="profile-edit-btn butt1" to={"/Edit"} style={{width: "100px"}}>Edit Profile</NavLink>
                   <br/>
               <NavLink type="submit" className="exp-btn" to={"/Experience"} style={{}}>Experience</NavLink>
                   </span>
               
               </div>
             </div>
           </div>
            </form>
            
          </div>
        </div>
      </section>

        </>
    )
}

export default Profile;