import React, { useEffect } from "react";
import "./Register.css";
import { useState } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.user);
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
        if(reader.readyState === 2) {
            setAvatar(reader.result);
        }
    };
    }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, avatar, password));
  }

  useEffect(() => {
    if(error) {
        alert.error(error);
        dispatch({type: "clearErrors"});
    }  
  }, [dispatch, error, alert]);


  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange}/>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          className="registerInputs"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/"><Typography>Already Signed up? Login Now</Typography></Link>

        <Button disabled={loading} type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default Register;
