import {Component} from 'react';
import {CustomHead} from '../components/head';
import './register.scss';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''}
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
    // make api call;
  }

  render () {
    // console.log(this.state);
    return (
      <div>
        <CustomHead />
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
    )
  }
};

export default Register;