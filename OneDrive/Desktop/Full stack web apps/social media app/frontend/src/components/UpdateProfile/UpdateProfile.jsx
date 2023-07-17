import React, { useEffect } from "react";
import "./UpdateProfile.css";
import { useState } from "react";
import { Avatar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../Actions/User";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {

    const {loading, error, user} = useSelector((state) => state.user);
    const {loading: updateLoading, error:updateError, message} = useSelector((state) => state.like);
  
    const [name, setName] = useState(user.handleImageChange);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
  
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
        if(reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
        }
    };
    }

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  }

  useEffect(() => {
    if(error) {
        alert.error(error);
        dispatch({type: "clearErrors"});
    }  
    if(updateError) {
        alert.error(updateError);
        dispatch({type: "clearErrors"});
    }  
    if(message) {
        alert.error(message);
        dispatch({type: "clearMessage"});
    }  
  }, [dispatch, error, alert, message, updateError]);


  return (
   loading ? (
    <Loader/> ) : (
        <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            Social App
          </Typography>
  
          <Avatar
            src={avatarPreview}
            alt="User"
            sx={{ height: "10vmax", width: "10vmax" }}
          />
  
          <input type="file" accept="image/*" onChange={handleImageChange}/>
  
          <input
            type="text"
            value={name}
            placeholder="Name"
            required
            className="updateProfileInputs"
            onChange={(e) => setName(e.target.value)}
          />
  
          <input
            type="email"
            placeholder="Email"
            className="updateProfileInputs"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <Button disabled={updateLoading} type="submit">Update</Button>
        </form>
      </div>
    )
  );
};
export default UpdateProfile;
