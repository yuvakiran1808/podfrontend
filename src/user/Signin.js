import React, { useState } from "react";
import { signin, athenticate, isAuthenticated } from "../auth/index";
import { Navigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: true,
    didRedirect: false,
  });

  const { email, password, error, didRedirect } = values;
  const { user } = isAuthenticated();
  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false});
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          athenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err)=>{
        console.log("error in the signin form")
      });
  };

  const redirectHandler = ()=>{
    if(didRedirect)
    {
      if(user&&user.role === "1")
      {
        return <Navigate to = "/" />
      }
    }
    if(isAuthenticated())
    {
      return <Navigate to = "/" />
    }
  }

  const successmessage = () => {
    return (
      isAuthenticated() &&
      toast("successfully logged in", {
        type: "success",
        theme: "dark",
        toastId: "1",
      })
    );
  };

  const errormessage = () => {
    return (
      error &&
      toast(`${error}`, {
        type: "error",
        theme: "dark",
        toastId: "2",
      })
    );
  };

  return (
    <div className="text-white p-4 py-5 bg-dark" style={{ height: "100vh" }}>
      <h1 className="text-center mt-5">Signin Form</h1>

      <form action="" className="col-md-6 mx-auto">
        <div className="p-2">
          <label htmlFor="email" className="py-2 h6">
            Enter your email:
          </label>
          <input
            type="email"
            placeholder="email"
            className="form-control border border-dark py-2"
            id="email"
            required
            onChange={onChangeHandler("email")}
          />
        </div>
        <div className="p-2">
          <label htmlFor="pass" className="py-2 h6">
            Enter your password:
          </label>
          <input
            type="password"
            placeholder="password"
            className="form-control border border-dark py-2"
            id="pass"
            required
            onChange={onChangeHandler("password")}
          />
        </div>
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onSubmitHandler}
            className="btn btn-success w-25"
          >
            Login
          </button>
        </div>
      </form>
      {redirectHandler()}
      {successmessage()}
      {errormessage()}
      <ToastContainer />
    </div>
  );
};

export default Signin;
