import { useFormik } from 'formik';
import React from "react";
import NavBar from "../routes/NavBar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';

// styling
import '../NavBar.css';

// defining loginpage component as function component
const LoginPage = () => {
  const { accounts, handleLogin } = useAppContext(); // getting login handler from context
  const navigate = useNavigate();

  // requesting login info from user
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    // setting up username and password as required fields
    validate: (values) => {
      const errors = {};
      if (!values.username) errors.username = "Required";
      if (!values.password) errors.password = "Required";
      return errors;
    },

    onSubmit: (values, { setSubmitting, setErrors }) => {
      const success = handleLogin(values.username, values.password);
      if (success) {
        navigate("/events"); // redirect to dashboard after successful login
      } else {
        setErrors({ password: "Invalid username or password" });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="add-event-container">
      <NavBar />
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit} className="add-event-form">
        <div className="form-group">
          <label>Username or Email:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username or email"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && <div className="error">{formik.errors.username}</div>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && <div className="error">{formik.errors.password}</div>}
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;