import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "../css/signin.css"
import img from "../imgs/login.png"
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = ()=>{
  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async(event) =>{
    event.preventDefault();
    const res = await fetch("/api/auth/signin",{
      method:"POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = res.json();
    if(res.status === 400 || !data){
      window.alert("Invalid Credentials");
    }else{
      dispatch({type:"USER", payload:true});
      window.alert("Login Successful");
      navigate("/");

    }
  }

    return (
        <section className="section-container">
        <div className="container" style={{height:"500px"}}>
          <div className="myCard">
            <div className="row">
             
              <div className="col-md-6">
                <div className="box"> 
                    <figure>
                    <img className="signup-img" src={img} alt="signup-img"></img>
                    </figure>
                    <div className=""><NavLink className="butt_out" to="/signup">Not Registered?</NavLink></div>
                  </div>
              </div>
              <div className="col-md-6">
                <div className="myLeftCtn" style={{height: "400px"}}>
                  <form className="myForm text-center" style={{top:"100px"}} method="POST">
                    <header>Sign In</header>
                    <div className="form-group">
                      <i className="fas fa-envelope"></i>
                      <input className="myInput" type={"email"} name="email" 
                      value={email}
                      onChange = {(event)=>{
                        setEmail(event.target.value);
                      }}
                      placeholder="Email" id="email" required></input>
                    </div>

                    <div className="form-group">
                      <i className="fas fa-lock"></i>
                      <input className="myInput" name="password" type={"password"} 
                      value={password} 
                      onChange = {(event)=>{
                        setPassword(event.target.value);
                      }}
                       placeholder="Password" id="password" required></input>
                    </div>

                    <input type={"submit"} name="signin" id="signin" className="butt" value={"Log In"}
                    onClick={loginUser}
                    />

                  </form>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    )
}

export default Login;