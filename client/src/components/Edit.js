import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../css/profile.css";
import profile from "../imgs/profile-img.jpg";
import {  NavLink, useNavigate } from "react-router-dom";
import pic from "../imgs/about-pic.jpg";
import RotateLoader from "react-spinners/RotateLoader";

const Edit = ()=>{
    const navigate = useNavigate();
    const [userData, setUserData] = useState({_id:"", name:"", email:"", phone:"", work:"", image:"", organisation: ""});
    const [loading, setLoading] = useState(true);
    const userEdit = async() =>{
        try {
            const res = await fetch("/api/user/edit",{
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                    
                },
                
            });
            const data = await res.json();
            console.log(data);
            setTimeout(() => {
                setLoading(false);
              }, 2000);
            setUserData({...userData, _id:data._id, name:data.name, email: data.email, phone: data.phone, work: data.work, image: data.image, organisation: data.organisation});
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
            

        } catch (err) {
            console.log(err);
            navigate("/profile");
            
        } 
    }
    useEffect(()=>{
        userEdit();
    },  []);
    if(loading){
        return (
          <section className="section loading">
            <RotateLoader color='#36d7b7' className='loader' ></RotateLoader>
            
            </section>
        )
      }


    const handleInputs = (event)=>{
        const {name, value} = event.target;
        setUserData({...userData, [name]:value});
    }

    const EditForm = async(event)=>{
        event.preventDefault();
        const {name, email, phone, work, image, organisation} = userData;
        const res = await fetch("/api/user/edit",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, image, organisation,
            })
        });
        const data = await res.json();
        if(!data){
            console.log("Profile not updated");
        }else{
            alert("Profile Updated");
            setUserData({...userData});
            navigate("/profile");
        }
    }


    return (
        <>
        <section className="section-container about">
        <div className="container mt-3" style={{height:"550px"}}>
          <div className="myCard">
            <form method="POST" id="edit-form" name="edit-form">
            <div className="row">
             
             <div className="col-md-4 left">
               <div className="box"> 
                   <figure>
                   <img className="signup-img" width="150px" 
                    src={userData.name === "Jatin Bisht" ? profile : userData.image} 
                    alt="signup-img"></img>
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
                       <h2 style={{padding : "0 22%"}} className="profile-heading" >Edit Profile</h2>
                        <br></br>
                        <div className="row">
                               <div className="col-md-6">
                                   <label>User ID</label>
                               </div>
                               <div className="col-md-6">
                                  <input name="_id" value={userData._id} onChange={handleInputs} readOnly />
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Name</label>
                               </div>
                               <div className="col-md-6">
                                  <input name="name" value={userData.name} 
                                  onChange={handleInputs}></input>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Email</label>
                               </div>
                               <div className="col-md-6">
                               <input name="email" value={userData.email}
                               onChange={handleInputs} readOnly ></input>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Phone</label>
                               </div>
                               <div className="col-md-6">
                               <input name="phone" value={userData.phone}
                               onChange={handleInputs} ></input>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Profession</label>
                               </div>
                               <div className="col-md-6">
                               <input name="work" value={userData.work}
                               onChange={handleInputs} ></input>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Organisation</label>
                               </div>
                               <div className="col-md-6">
                               <input name="organisation" value={userData.organisation}
                               onChange={handleInputs} ></input>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 info">
                                   <label>Profile Image</label>
                               </div>
                               <div className="col-md-6">
                               <input name="image" value={userData.image}
                               onChange={handleInputs} ></input>
                               </div>
                           </div>
                       </div>
                   </div>
               <NavLink className="submit-btn" onClick={EditForm}>Submit</NavLink>
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

export default Edit;