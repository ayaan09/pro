import React, {
  useState
} from 'react';
import {
  Helmet
} from 'react-helmet';
import SignUpStyle from "./signup.css";

import axios from 'axios';

function SignUp({ storeToken }) {
  /* CSS module styles */
  const button = SignUpStyle.button;
  const div = SignUpStyle.div;
  const form = SignUpStyle.form;

  /**
   * Checks if the form has errors
   * If any key in the object has an error message, valid is set to false
   * otherwise valid is set to true
   * @param {Object} errors - contains the errors messages if any
   * @returns {boolean} true if form is valid, false otherwise
   */


  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  // initial state of User input and errors
  const [values, setValues] = useState({
    username: '',
    sid: '',
    password: '',
    password2: '',
    errors: {
      username: '',
      sid: '',
      password: '',
      password2: '',
      DuplicateUser: ''
    }
  });

  /**
   * Changes the value of the field that the user edits
   * Checks if any of the cases is false and updates the erros messages accordingly
   * @param {object} event 
   */

  function handleChange(event) {
    const { name, value } = event.target
    setValues(preValues => {
      return {
        ...preValues,
        [name]: value
      }
    })

    // error validation to determine what kind of error messsage to display if some input is invalid
    switch (name) {
      case 'username':
        values.errors.DuplicateUser = '';
        values.errors.username =
          value.length < 4 ?
            'username must be at least 4 characters long!' :
            '';
        break;
      case 'SID':
        values.errors.sid = 
        value.length !== 10 ?
          'SID is invalid!' :
          '';
        break;
      case 'password':
        values.errors.password =
          value.length < 6 ?
            'Password must be atleast 6 characters long!' :
            '';
        break;
      case 'password2':
        values.errors.password2 =
          value !== values.password ?
            'Passwords do not match' :
            '';
        break;
      default:
        break;
    }

  }

  /**
   * Calls @function validateForm
   * If the function call returns true, a post request is made to the server
   * If the server response is success, calls a callback function to create a cookie
   * Otherwise an error message will be shown 
   * @param {object} event 
   */
  function handleSubmit(event) {
    event.preventDefault();
    console.log(values.username, values.sid)
    const valid = validateForm(values.errors);
    if (valid) {
      axios.post('https://sunnysocial.herokuapp.com/api/auth/register', {
        name: values.username,
        password: values.password,
        sid: values.sid
      }).then(
        response => {
          storeToken(response);
        },
        error => {
          setValues(preValues => {
            return ({
              ...preValues,
              errors: {
                DuplicateUser: 'Username already exists, Please enter a new username'
              }
            })
          })
        }
      )
    }
  }

  return (
    <div className="sform-container">

      { /* Edits title of the page */}

      <Helmet >
        <title>Sunny Social - Signup </title>
      </Helmet>

      {/* Sign up page contents */}
      
      <h2 className="form-header">Create your account </h2>
      <form method="post" onSubmit={handleSubmit} autocomplete="off">
        <div className="mb-3" >
          <input className="form-control form-control-lg"
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            required />
          {values.errors.username && <p> {values.errors.username}</p>}
          {values.errors.DuplicateUser && <p> {values.errors.DuplicateUser}</p>}
        </div>
        <div className="mb-3">
          <input
            className="form-control form-control-lg"
            type="text"
            name="sid"
            placeholder="SID"
            value={values.sid}
            onChange={handleChange}
            required />
          {values.errors.sid && <p> {values.errors.sid}</p>}
        </div>
        <div className="mb-3" >
          <input
            className="form-control form-control-lg"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required />
          {values.errors.password && <p> {values.errors.password}</p>}
        </div>
        <div className="mb-3" >
          <input
            className="form-control form-control-lg"
            type="password"
            name="password2"
            placeholder="Confirm password"
            value={values.password2}
            onChange={handleChange}
            required />
          {values.errors.password2 && <p> {values.errors.password2}</p>}
        </div>
        <button type="submit" className="btn btn-primary btn-lg" >Sign up </button>
      </form>
      <p> Already a member ? <a href="/login" > Log in </a></p>
    </div>
  )
}

export default SignUp;
