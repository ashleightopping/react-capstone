import { useFormik } from 'formik';
import React from 'react';
import NavBar from "../routes/NavBar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
// styling
import '../NavBar.css';
import '../index.css';

// initialising values required for account
const Register = () => {
  const { accounts, setAccounts, handleLogin } = useAppContext(); // get accounts, setAccounts, handleLogin from context
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    },

    // using validate to check that data inputted meets the correct format
    validate: (values) => {
      const errors = {};

      // making full name a required field
      if (!values.fullName) {
        errors.fullName = "Required";
      }

      // checking email is valid (uses @)
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      // making username a required field
      if (!values.userName) {
        errors.userName = "Required";
      }

      // checking password meets requirements (min 8 characters, lower and upper case, number, special character)
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
        errors.password = "Password must have at least 8 characters, with at least 1 uppercase and lowercase letter, a number and a special character";
      }

      // checking that both password and confirm password match each other
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
      }

      return errors;
    },

    // on submit, add the new account to the array and navigate to events dashboard
    onSubmit: (values, { resetForm }) => {
      // create new user object
      const newUser = {
        username: values.userName,
        password: values.password,
        name: values.fullName,
        email: values.email,
      };

      // add user to accounts array
      setAccounts([...accounts, newUser]);

      // automatically log in the new user
      handleLogin(values.userName, values.password);

      resetForm(); // clear form
      navigate("/events"); // go to events dashboard
    },
  });

  return (
    <div>
      <NavBar /> 
        <div className="add-event-container">
          <h1>New here? Create an account</h1>

          <form onSubmit={formik.handleSubmit} className="add-event-form">
           
            <div className="form-group">
            <label>Full name:</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.errors.fullName && (
              <p style={{ color: 'purple', marginTop: '5px' }}>{formik.errors.fullName}</p>
            )}
          </div>

          {/* user enters email address */}
            <div className="form-group">
            <label>Email address:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <p style={{ color: 'purple', marginTop: '5px' }}>{formik.errors.email}</p>
            )}
          </div>

          {/* user enters username */}
            <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter your username"
              maxLength={20}
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            {formik.errors.userName && (
              <p style={{ color: 'purple', marginTop: '5px' }}>{formik.errors.userName}</p>
            )}
          </div>

          {/* user enters password */}
            <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength={8}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <p style={{ color: 'purple', marginTop: '5px' }}>{formik.errors.password}</p>
            )}
          </div>

           {/* user confirms password */}
            <div className="form-group">
            <label>Confirm password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && (
              <p style={{ color: 'purple', marginTop: '5px' }}>{formik.errors.confirmPassword}</p>
            )}
           </div>

        <button type="submit" className="submit-btn">
          Create your account
        </button>
        </form>
      </div>
  </div>
  );
};

export default Register;