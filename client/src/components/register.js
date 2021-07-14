import React, { useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import "../App.css";
import { Form } from "reactstrap";
import auth from "../services/authService";
import "./login.css";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    name: Joi.string().required(),
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = Joi.validate({ name, email, password }, schema);
      if (result.error) throw result.error.details[0].message;

      const response = await userService.register({ name, email, password });
      auth.loginWithJWT(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.msg);
      } else {
        toast.error(error);
      }
    }
  };
  return (
    <Form className="main" onSubmit={onSubmit}>
      <p className="sign" align="center">
        Sign Up
      </p>
      <input
        type="text"
        name="name"
        className="em"
        align="center"
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="em"
        align="center"
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        className="pa"
        align="center"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="submit">Submit</button>
    </Form>
  );
}
export default RegisterForm;
