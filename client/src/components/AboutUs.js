import React from "react"
import "../css/about.css"
import profile from "../imgs/profile-img.jpg";
import "bootstrap";
import { FaAngleDoubleRight } from "react-icons/fa";

const AboutUs = ()=>{
    return (
    <section className="section"> 
    <div className="title">
    <h2>AboutUs</h2>
    <div className="underline"></div>
    </div>
    <div className="about-cnt col-md-auto">
    <img className="about-img" src={profile} alt="img"></img>
    <div className="name">
    <h4 >Jatin Singh Bisht</h4>
    <p className="det">Web Developer</p>
    </div>
    </div>
    <div className="about-right-cnt col-md-auto">
        <h3>CREATEYOURPROFILE.COM</h3>  
      
        <p>is for the users to share about themselves and showcase their skills.<br/>
         In this one can upload about their working profile and experiences. <br/>
         In this platform Users can seek guidance  and can learn from each others experiences.<br/>
         Not only candidates but Organisations can also search for the suitable candidates based on the required skills.
        </p>
        <div className="job-desc"> 
             <FaAngleDoubleRight className="job-icon" />
             <p>My name is Jatin Singh Bisht. I am a 2nd year electronics student at Punjab Engineering College.<br />
              I made this Website while learning Web Development by following yt tutorials and some blogs.</p>
             </div>
    
    </div>
</section>
)
   
    
}

export default AboutUs