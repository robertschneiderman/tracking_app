import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/authentication/index';
import { connect } from 'react-redux';

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
  } else if (!values.name) {
    errors.name = 'Required';
  }

  return errors;
};


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
  );
};

const handleFormSubmit = ({ email, name, password }) => {
  actions.signupUser({ email, password});
};

const Signup = (props) => {
  debugger;
  const { handleSubmit, fields: { email, name, password }} = props;
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        <label>Email:</label>
        <Field 
          name="email"
          component={renderField}
          className="form-control" 
          validate={[validation.required, validation.email]} />
      </fieldset>

      <fieldset className="form-group">
        <label>Name:</label>
        <Field 
          name="name" 
          component={renderField} 
          className="form-control" 
          validate={[validation.required]} />
      </fieldset>

      <fieldset className="form-group">
        <label>Password:</label>
        <Field 
          name="password" 
          type="password" 
          component={renderField} 
          className="form-control"
          validate={[validation.required, validation.minLength(6)]} />
      </fieldset>
      
      <button className="btn btn-primary" action="submit">Sign up</button>    
    </form>
  );
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

let signUpForm = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default signUpForm = connect(mapStateToProps, actions)(signUpForm);

