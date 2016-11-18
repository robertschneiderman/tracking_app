import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { SubmissionError } from 'redux-form';
import $ from 'jquery';
import { connect } from 'react-redux';

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
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000) // simulate server latency
    .then(() => {
      if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
        throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
      } else if (values.password !== 'redux-form') {
        throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
      } else {
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      }
    })
}

const myTempSubmit = signupUser => {
  debugger;
  console.log("e:", e);
  e.preventDefault();
  let user = { email: $('#email'), password: $('#password') };
  signupUser(user);
}

const renderAlert = (errorMessage) => {
  console.log("inside render alert");
  if (errorMessage) {
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {this.props.errorMessage}
      </div>
    );
  }
}

const Signup = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  console.log("props:", props);

  return(
    <form onSubmit={handleSubmit(myTempSubmit.bind(this, props.signupUser))}>
      <fieldset className="form-group">
        <Field input={{id: "email"}} name="email" component={renderField} label="Email" />
      </fieldset>
      <fieldset className="form-group">
        <Field input={{id: "password"}} name="password" component={renderField} label="Password" type="password" />
      </fieldset>
      <fieldset className="form-group">
        <Field input={{id: "password-confirm"}} name="passwordConfirm" component={renderField} label="Password Confirm" type="password" />
      </fieldset>
      {renderAlert(props.errorMessage)}
      <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>          
    </form>
  )
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

let signUpForm = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default signUpForm = connect(mapStateToProps, actions)(signUpForm);
