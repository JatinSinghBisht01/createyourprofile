import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { NavLink } from "react-router-dom";
import "../css/contact.css";

const Contact = ()=>{
    
   
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    const userContact = async() =>{
        try {
            const res = await fetch("/api/user/getdata",{
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                    
 
                },
                
            });
            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email: data.email, phone: data.phone});
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
                
            }
            

        } catch (err) {
            console.log(err);
            
        } 
    }
    useEffect(()=>{
        userContact();
    },  []);

    const handleInputs = (event)=>{
        const {name, value} = event.target;
        setUserData({...userData, [name]:value});
    }

    const ContactForm = async(event)=>{
        event.preventDefault();
        const {name, email, phone, message} = userData;
        const res = await fetch("/api/user/contact",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });
        const data = await res.json();
        if(!data){
            console.log("message not send");
        }else{
            alert("Message Sent");
            setUserData({...userData, message:""});
        }
    }


//sending data to backend

    return (
       
<section class="mb-4">

        <div className="container " style={{padding: "40px"}}>
        {/* <!--Section heading--> */}
    <h2 class="h1-responsive font-weight-bold text-center my-4">ContactUs</h2>
    {/* <!--Section description--> */}
    <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

    <div class="row">

        {/* <!--Grid column--> */}
        <div class="col-md-12">
            <form id="contact-form" name="contact-form" method="POST">

                {/* <!--Grid row--> */}
                <div class="row">

                    {/* <!--Grid column--> */}
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="name" name="name" class="form-control"
                             value={userData.name} 
                             onChange={handleInputs} />
                            <label for="name" class="">Your name</label>
                        </div>
                    </div>
                    {/* <!--Grid column--> */}

                    {/* <!--Grid column--> */}
                    <div class="col-md-6">
                        <div class="md-form mb-0">
                            <input type="text" id="phone" name="phone" class="form-control" 
                            value={userData.phone}
                            onChange={handleInputs} />
                            <label for="phone" class="">Phone no:</label>
                        </div>
                    </div>
                    {/* <!--Grid column--> */}

                </div>
                {/* <!--Grid row--> */}

                {/* <!--Grid row--> */}
                <div class="row">
                    <div class="col-md-12">
                        <div class="md-form mb-0">
                            <input type="text" id="email" name="email" class="form-control" 
                            value={userData.email}
                            onChange={handleInputs} />
                            <label for="email" class="">Your email</label>
                        </div>
                    </div>
                </div>
                {/* <!--Grid row--> */}

                {/* <!--Grid row--> */}
                <div class="row">

                    {/* <!--Grid column--> */}
                    <div class="col-md-12">

                        <div class="md-form">
                            <textarea type="text" name="message" rows="2" class="form-control md-textarea"
                            value={userData.message}
                            onChange={handleInputs}
                            ></textarea>
                            <label for="message">Your message</label>
                        </div>

                    </div>
                </div>
                {/* <!--Grid row--> */}

            </form>

            <div class="text-center text-md-left">
                <NavLink className="btn btn-primary buttn" onClick={ContactForm}>Send</NavLink>
                
            </div>
            <div class="status"></div>
        </div>
        {/* <!--Grid column--> */}

        {/* <!--Grid column--> */}
        {/* <div class="col-md-3 text-center">
            
            <ul class="list-unstyled mb-0">
                <li><i class="fas fa-map-marker-alt fa-2x"></i>
                    <p>San Francisco, CA 94126, USA</p>
                </li>

                <li><i class="fas fa-phone mt-4 fa-2x"></i>
                    <p>+ 01 234 567 89</p>
                </li>

                <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                    <p>contact@portfolio.com</p>
                </li>
            </ul>
        </div> */}
        {/* <!--Grid column--> */}

    </div>
        </div>
    

</section>
    )
}

export default Contact;