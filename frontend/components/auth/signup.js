import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
// import Container from './/_container';

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.email = 'Required';
  } else if (!values.password) {
    errors.password = 'Required';    
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  } else if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}:</label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const Signup = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  return(
    <form className="">
      <fieldset className="form-group">
        <Field name="email" component={renderField} label="Email" />
      </fieldset>
      <fieldset className="form-group">
        <Field name="password" component={renderField} label="Password" type="password" />
      </fieldset>
      <fieldset className="form-group">
        <Field name="passwordConfirm" component={renderField} label="Password Confirm" type="password" />
      </fieldset>
      <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>          
    </form>
  )
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);