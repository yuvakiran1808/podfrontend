import React, { useState } from "react";
import "../styles.css";
import { signup } from "../auth/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  //higher order functions
  const onChangeHandler = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //onsubmit handler

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(() => {
        console.log("error in signup");
      });
  };

  const successmessage = () => {
    return (
      success &&
      toast("account created successfully", {
        type: "success",
        autoClose: 5000,
        toastId: "2",
      })
    );
  };
  const errormessage = () => {
    return (
      error &&
      toast(`${error}`, {
        type: "error",
        autoClose: 5000,
        toastId: "1",
      })
    );
  };

  const signupform = () => {
    return (
      <div className="text-white p-4 py-5 bg-dark" style={{ height: "100vh" }}>
        <h1 className="text-center mt-5">Signup Form</h1>

        <form action="" className="col-md-6 mx-auto">
          <div className="p-2">
            <label htmlFor="email" className="py-2 h6">
              Enter your name:
            </label>
            <input
              type="text"
              placeholder="name"
              className="form-control border border-dark py-2"
              id="name"
              required
              value={name}
              onChange={onChangeHandler("name")}
            />
          </div>
          <div className="p-2">
            <label htmlFor="email" className="py-2 h6">
              Enter your email:
            </label>
            <input
              type="email"
              placeholder="email"
              className="form-control border border-dark py-2"
              id="email"
              value={email}
              onChange={onChangeHandler("email")}
              required
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
              value={password}
              onChange={onChangeHandler("password")}
              required
            />
          </div>
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={onSubmitHandler}
              className="btn btn-success w-25"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {signupform()}
      {successmessage()}
      {errormessage()}
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Signup;
