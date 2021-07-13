import React, { useState } from "react";
import Joi from "joi-browser";
//import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "../App.css";
import { Form } from "reactstrap";
import auth from "../services/authService";
import "./login.css";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = Joi.validate({ email, password }, schema);
      if (result.error) throw result.error.details[0].message;
      await auth.login(email, password);
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
    <div className="main">
      <p className="sign" align="center">
        Sign In
      </p>
      <Form className="form1" onSubmit={onSubmit}>
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
        <br></br>
        <br></br>
        <button className="submit">Submit</button>
      </Form>
    </div>
  );
}
export default LoginForm;
