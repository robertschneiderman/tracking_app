import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/authentication/index';
import { connect } from 'react-redux';
// import store from './store';

// const validation = {};
// validation.required = value => value ? undefined : 'Required';
// validation.maxLength = max => value =>
//   value && value.length > max ? `Must be ${max} characters or less` : undefined;
// validation.minLength = min => value =>
//   value && value.length > min ? `Must be ${min} characters or less` : undefined;
// validation.email = value =>
//   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//   'Invalid email address' : undefined;

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.username = 'Must be at least 3 characters';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be at least 6 characters';
  }  

  return errors;
};


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
  );
};

const handleFormSubmit = ({ email, name, password }) => {
  debugger;
  actions.signupUser({ email, name, password});
};

const Signup = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <fieldset className="form-group">
        <label>Email:</label>
        <Field 
          name="email"
          component={renderField}
          className="form-control" />
      </fieldset>
      
      <fieldset className="form-group">
        <label>Name:</label>
        <Field 
          name="name" 
          component={renderField} 
          className="form-control" />
      </fieldset>

      <fieldset className="form-group">
        <label>Password:</label>
        <Field 
          name="password" 
          type="password" 
          component={renderField} 
          className="form-control" />
      </fieldset>
      
      <button className="btn btn-primary" action="submit">Sign up</button>    
    </form>
  );
};

// function mapStateToProps(state) {
//   return { errorMessage: state.auth.error };
// }

export default reduxForm({
  form: 'signup',
  validate
})(Signup);
