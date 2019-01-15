import { Component } from 'react';
import { CustomHead } from '../components/head';
import { registerGQL } from '../services/gqlClient';
import { Popup } from '../components/popup';
import { Loading } from '../components/loading';

import './register.scss';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', success: '', info: '', user: null, loading: false};
  }

  registerRequest = () => {
    registerGQL(this.state.username, this.state.password)
      .then(response => {
          let {data: {register: {success, info, user}}} = response;
          this.setState({success, info, user, loading: false});
          this.handleResponse();
        })
      .catch(err => {
        console.error('Register API failed: ', err);
        this.setState({loading: false, info: 'Error registering new user', success: false});
      });
  }

  handleResponse = () => {
    if(this.state.success) {
      setTimeout(() => this.redirect(`/user?username=${this.state.user.username}`), 1000);
    }
  }

  onUsernameChange = (e) => {
    let username = e.target.value;
    this.setState({username});
  }
  onPasswordChange = (e) => {
    let password = e.target.value;
    this.setState({password});
  }

  onSubmit = () => {
    this.setState({loading: true})
    this.registerRequest();
  }

  redirect = (url) => {
    window.location = url;
  }

  render () {
    return (
      <div>
        <CustomHead />
        <div className='container'>
          { this.state.info ? <Popup category={this.state.success ? 'info': 'error'} msg={this.state.info} /> : null}
          <Loading show={this.state.loading}/>
          <h3>Register here</h3>
          <div className='register'>
            <label htmlFor='username'>Username: </label>
            <input type='text' name='username' value={this.state.username} onChange={this.onUsernameChange} />
            <label htmlFor='password'>Password: </label>
            <input type='password' name='password' value={this.state.password} onChange={this.onPasswordChange} />
            <br />
            <button onClick={this.onSubmit}>Register</button>
          </div>
        </div>
      </div>
    )
  }
};

export default Register;