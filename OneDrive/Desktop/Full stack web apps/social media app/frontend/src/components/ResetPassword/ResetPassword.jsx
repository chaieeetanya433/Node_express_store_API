import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "@mui/material";
import { resetPassword } from "../../Actions/User";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const {error, loading, message} = useSelector((state) => state.like);

    const [newPassword, setNewPassword] = useState(""); 

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword));
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch({ type: "clearErrors" });
        }
        if (message) {
          alert.error(message);
          dispatch({ type: "clearMessage" });
        }
      }, [alert, error, message, dispatch]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          className="resetPasswordInputs"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Link to="/"><Typography>Login!</Typography></Link>

        <Link to="/forgot/password"><Typography>Request Another Token!</Typography></Link>

        <Button disabled={loading} type="submit">Reset Password</Button>
      </form>
    </div>
  )
}
export default ResetPassword;