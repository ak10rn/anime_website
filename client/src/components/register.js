import React, { useState } from "react";
import { toast } from "react-toastify";
import Joi from 'joi-browser';
//import { useHistory } from "react-router";
import * as userService from '../services/userService';
import "../App.css";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import auth from "../services/authService";

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const schema = {
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(5)
          .required(),
        name: Joi.string().required()
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = Joi.validate({ name, email, password }, schema);
            if (result.error) throw result.error.details[0].message;

            const response = await userService.register({ name, email, password });
            auth.loginWithJWT(response.headers['x-auth-token']);
            window.location = '/';
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.msg);
            }
            else {
                toast.error(error);
            }
        }
      }
    return (
        <Form onSubmit={onSubmit}>
            <FormGroup className="mb-1">
                <Label>Name</Label>
                <Input type="text" name="name" onChange={e => setName(e.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-1">
                <Label>Email</Label>
                <Input type="text" name="email" onChange={e => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-1">
                <Label>Password</Label>
                <Input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>  
    );
}
export default RegisterForm;