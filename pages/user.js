import { Component } from 'react';
import { CustomHead } from '../components/head';
import { readUserDetailsGQL, getDocDetailsGQL } from '../services/gqlClient';
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
    this.state = {
      user: {
        success: '', info: '', user_details: {place: '', doc_id: ''}
      }, 
      doc: {
        success: '', info: '', doc_details: {username: '', file: '', type: ''},
      },
      loading: false
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    this.readUserDetailsRequest();
    this.getDocDetailsRequest();
  }

  getDocDetailsRequest = () => {
    getDocDetailsGQL(this.props.username)
      .then(response => {
        let {data: {getDoc: {success, info, doc_details}}} = response;
        this.setState({doc: {success, info,  doc_details}, loading: false});
      })
      .catch(err => {
        console.error('getDocDetails API failed: ', err);
        this.setState({doc: {success: false, info: 'Error reading doc details'}, loading: false});
      })
  }

  readUserDetailsRequest = () => {
    readUserDetailsGQL(this.props.username)
      .then(response => {
          let {data: {readUserDetails: {success, info, user_details}}} = response;
          this.setState({user: {success, info, user_details}, loading: false});
        })
      .catch(err => {
        console.error('readUserDetails API failed: ', err);
        this.setState({doc: {success: false, info: 'Error reading user details'}, loading: false});
      });
  }

  redirect = (url) => {
    window.location = url;
  }

  renderPopUp(user, doc) {
    if(user.info) {
      return (
        <Popup category={this.state.user.success ? 'info': 'error'} msg={this.state.user.info} />
      )
    }
    if(doc.info) {
      return (
        <Popup category={this.state.doc.success ? 'info': 'error'} msg={this.state.doc.info} />
      )
    }
    return null;
  }

  render () {
    let {user, doc} = this.state;
    let {place, doc_id} = user.user_details;
    let {file, type} = doc.doc_details;
    let {username} = this.props;
    return (
      <div>
        <CustomHead />
        <div className='container'>
          {this.renderPopUp(user, doc)}
          <Loading show={this.state.loading}/>
          <h3>Hello <em>{username}</em></h3>
          <div className='user_details'>
            <h4>Place: <em>{place}</em></h4>
            <div className='doc'>
              <h4>Document:</h4>
              <div className='fields'>
                <h5>Doc type: <em>{type}</em></h5>
                <h5>Doc: {file? <a href={file} target='_blank' download>download</a>: null}</h5>
              </div>
            </div>
          </div>
          <button className='button button-primary'onClick={() => this.redirect(`/edit?username=${username}`)}>Edit</button>
          <button className='button' onClick={() => this.redirect(`/delete?username=${username}`)}>Delete</button>
        </div>
      </div>
    )
  }
};

export default User;