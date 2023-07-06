import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../css/home.css";
import { NavLink } from "react-router-dom";
import Typed from "typed.js"

const Home = ()=>{
    const year = new Date().getFullYear();
    const [userName, setUserName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
   
    const userHomePage = async() =>{
        try {
            const res = await fetch("/api/user/getdata",{
                method: "GET",
                headers: {
                    "Content-Type" : "application/json"
                    
 
                },
                
            });
            const data = await res.json();
            // console.log(data);
           
            setUserName(data.name);
            if(res.status === 200){
                setIsLoggedIn(true);
            }else if(res.status !== 200){
                setIsLoggedIn(false);
            }
           
        } catch (err) {
            console.log(err);
            
        } 
    }
    useEffect(()=>{
        console.log(userName);
        userHomePage();
        console.log(userName)
    },  []); 

    //typing animation
    const el = React.useRef(null);
    React.useEffect(() => {
        const typed = new Typed(el.current, {
          strings: ['<i>CREATEYOURPROFILE.COM</i>...'],
          typeSpeed: 150,
          backSpeed: 150,
          loop: true
        });
        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
          };
        }, []);

    return (
        <>
        <div>
        <div className="container-fluid banner">
            <div className="row">
                <div className="col-md-6 ctn offset-md-3">
                
                    <p className="text-center">WELCOME</p>
                   
                    {isLoggedIn ? <h1 className="text-center">{userName}</h1>  :
                    <>
                     <p className="text-center">TO</p>
                    <h1 className="text-center" ref={el} />
                    <NavLink className="btn btn-md but" to={"/login"} >GET STARTED</NavLink>
                    </>
                    }
                   
                     
                </div>
            </div>
           
        </div>
        {/* <br />       */}
        </div>
        
        
         
        <footer>
                <div>
                <i class="fa-brands fa-square-instagram fa-lg"></i> || <i class="fa-brands fa-linkedin fa-lg"></i> || <i class="fa-brands fa-square-facebook fa-lg"></i> 
                  <p>Copyright ⓒ {year} jatin</p>
                </div>
                
        </footer>
        </>
    )
}

export default Home;