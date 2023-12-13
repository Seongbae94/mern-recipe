import React, { useState } from "react";
import FormComponent from "../components/form";

const Auth = () => {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

const Login = () => {
  return <FormComponent title="login" />;
};

const Register = () => {
  return <FormComponent title="register" />;
};

const Form = () => {};
