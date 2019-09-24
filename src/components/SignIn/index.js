import React, { Component, Image } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignIn.css";
import Button from '@material-ui/core/Button';


import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';



const SignInPage = () => (
  <div>
    <h1 className="LoginLinks">Login</h1>
    <SignInForm />
    <div className="LoginLinks">
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onChange = event => {
   this.setState({ [event.target.id]: event.target.value });
 };


 onSubmit = event => {
   const { email, password } = this.state;

   this.props.firebase
     .doSignInWithEmailAndPassword(email, password)
     .then(() => {
       this.setState({ ...INITIAL_STATE });
       this.props.history.push(ROUTES.HOME);
     })
     .catch(error => {
       this.setState({ error });
     });

   event.preventDefault();
 };

  render() {
    const { email, password, error } = this.state;


    return (
      <div className="Login">
        <form onSubmit={this.onSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email Address"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button
            block
            size="large"
            disabled={!this.validateForm()}
            type="submit"
            color = 'primary'
            fullWidth = 'true'
          >
            Login
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
