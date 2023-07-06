import React ,{useState} from "react";
import "bootstrap";
import "../css/Signup.css"
import img from "../imgs/register.png"
import { NavLink, useNavigate } from "react-router-dom";

const Signup = ()=>{
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"", email:"", phone:"", work:"", password:"", cpassword:""
  });

  
  const handleChange = (event)=>{
    const { name, value } = event.target;
    setUser((prevUser) =>{
      return{
        ...prevUser, [name]:value
      }
    } );
  }

  const postData = async(event)=>{
    event.preventDefault();
    const {name, email, phone, work, password, cpassword} = user;
    const res = await fetch("/api/auth/register", {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });
    const data = await res.json();
    if(res.status===422 || !data ){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }
    else{
      window.alert("Registration Successful");
      console.log("Registration Successful");

      navigate("/login");
    }
  }
    return (
      <section className="section-container" >
        <div className="container"  style={{height: "600px"}}>
          <div className="myCard">
            <div className="row">
              <div className="col-md-6">
                <div className="myLeftCtn" style={{height: "500px"}}>
                  <form className="myForm text-center" id="myForm" method="POST"  >
                    <header>Sign Up</header>
                    <div className="form-group">
                      <i className="fas fa-user"></i>
                      <input name="name" className="myInput" type={"text"} 
                      value={user.name}
                      onChange={handleChange}  
                      placeholder="Username" id="username" required></input>
                    </div>

                    <div className="form-group">
                      <i className="fas fa-envelope"></i>
                      <input name="email" className="myInput" type={"email"} 
                      value={user.email}
                      onChange={handleChange} 
                      placeholder="Email" id="email" required></input>
                    </div>

                    <div className="form-group">
                      <i className="fas fa-phone"></i>
                      <input name="phone" className="myInput" type={"text"} 
                      value={user.phone}
                      onChange={handleChange} 
                      placeholder="Mobile Number" id="phone" required></input>
                    </div>

                    <div className="form-group">
                      <i className="fas fa-user-tie"></i>
                      <input name="work" className="myInput" type={"text"} 
                      value={user.work}
                      onChange={handleChange} 
                      placeholder="Profession" id="work" required></input>
                    </div>

                    <div className="form-group">
                      <i className="fas fa-lock"></i>
                      <input name="password" className="myInput" type={"password"} 
                      value={user.password}
                      onChange={handleChange} 
                      placeholder="Password" id="password" required></input>
                    </div>

                    <div className="form-group">
                      <i className="fas fa-lock"></i>
                      <input name="cpassword" className="myInput" type={"password"} 
                      value={user.cpassword}
                      onChange={handleChange} 
                      placeholder="Confirm Password" id="cpassword" required></input>
                    </div>

                    <div className="form-group">
                      <label>
                        <input id="check_1" name="check_1" type={"checkbox"} required />
                          <small>I read and agree to Terms and Conditions</small>
                          <div className="invalid-feedback">You must check the box.</div>
                        </label>
                    </div>
                    <input type={"submit"} onClick={postData} className="butt" value={"Create Account"}/>

                  </form>
                </div>
              </div>
              <div className="col-md-6">
              <div className="box"> 
                  <figure>
                  <img className="signup-img" src={img} alt="signup-img"></img>
                  </figure>
                  <div className=""><NavLink className="butt_out" to="/login">I am already registered</NavLink></div>
                  
                  
                  </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    )
}

export default Signup;