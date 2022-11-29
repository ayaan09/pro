import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import logo from "./logo.png";
import logInStyle from './login.css';

import axios from 'axios';


function LogIn({ storeToken }) {
    /* CSS module styles */
    const img = logInStyle.img;
    const form = logInStyle.form;
    const button = logInStyle.button;
    const div = logInStyle.div

    // initial state of User input
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: ''
    });

    /**
     * Sends a post request to the server
     * Returns a messsage error if username and password does not match
     * Otherwise calls a callback function to create a cookie
     * @param {object} event 
     */

    function handleSubmit(event) {

        event.preventDefault();
        axios.post('https://sunnysocial.herokuapp.com/api/auth/login',
            {
                name: values.username,
                password: values.password
            }).then(
                response => {
                    storeToken(response);
                },
                error => {
                    setValues(preValues => {
                        return ({
                            ...preValues,
                            error: 'Sorry, the username or password entered is incorrect. Please double-check and try again'
                        })
                    })
                }
            )
    }

    /**
     * Changes the value of the fields that the user edits
     * @param {Object} event 
     */

    function handleChange(event) {
        const { name, value } = event.target;

        setValues(preValues => {
            return ({
                ...preValues,
                [name]: value
            })
        });
    }

    return (
        <div className="container">

            {/* edits the webpage title */}

            <Helmet>
                <title>Sunny Social - login or sign up</title>
            </Helmet>
            <div className="row justify-content-start">
            
                {/* Left container  */}

                <div className="col-6">
                    <div className="left-container">

                        {/* website logo */}

                        <img className="logohobbyt" src={logo} alt="HobbyT logo" />

                        {/* Description */}

                    </div>
                </div>

                {/* Right container  Login form*/}

                <div className="col-6">
                    <div className="lform-container">
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    placeholder="Username"
                                    required
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    placeholder="Password"
                                    required
                                    onChange={handleChange} />
                                {values.error && <p>{values.error}</p>}
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg">Log in</button>
                        </form>
                        <hr />
                        <form>
                            <a href="/signup"><button type="button" className="btn btn-primary btn-lg">Sign up</button></a>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LogIn;
