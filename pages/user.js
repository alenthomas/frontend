import { Component } from 'react';
import { CustomHead } from '../components/head';
import { readUserDetailsGQL } from '../services/gqlClient';
import { Popup } from '../components/popup';
import { Loading } from '../components/loading';

import './user.scss';

export class User extends Component {
  static async getInitialProps({ query }) {
    const {username} = query;
    return { username };
  }

  constructor(props) {
    super(props);
    this.state = {success: '', info: '', user_details: {place: '', doc_id: ''}, loading: false};
  }

  componentDidMount() {
    this.setState({loading: true});
    this.readUserDetailsRequest()
  }

  readUserDetailsRequest = () => {
    readUserDetailsGQL(this.props.username)
      .then(response => {
          let {data: {readUserDetails: {success, info, user_details}}} = response;
          this.setState({success, info, user_details, loading: false});
        })
      .catch(err => {
        console.error('readUserDetails API failed: ', err);
        this.setState({loading: false, info: 'Error reading user details', success: false});
      });
  }

  redirect = (url) => {
    window.location = url;
  }

  render () {
    let {place, doc_id} = this.state.user_details;
    let {username} = this.props;
    return (
      <div>
        <CustomHead />
        { this.state.info ? <Popup category={this.state.success ? 'info': 'error'} msg={this.state.info} /> : null}
        <Loading show={this.state.loading}/>
        <h3>Hello {username}</h3>
        <div className='user_details'>
          <div>Place: {place}</div>
          <div>Doc_id: {doc_id}</div>
        </div>
        <button className='button button-primary'onClick={() => this.redirect(`/edit?username=${username}`)}>Edit</button>
        <button className='button button-danger' onClick={() => this.redirect(`/delete?username=${username}`)}>Delete</button>
      </div>
    )
  }
};

export default User;