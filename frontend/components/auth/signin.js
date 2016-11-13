import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

class Signin extends Component {

  handleFormSubmit({ email, password }) {
    console.log("this.props:", this.props);
    console.log(email, password);

    this.props.signinUser({ email, password});
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" className="form-control" />
        </fieldset>  
        <button className="btn btn-primary" action="submit">Sign in</button>    
      </form>
    );
  }
}

console.log("actions:", actions);

function mapStateToProps(state) {
  return { errorMessage: 'hey' };
}

let signInForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, null, actions)(Signin);

export default signInForm = connect(mapStateToProps, actions)(signInForm);

