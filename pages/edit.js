import { Component } from 'react';
import { CustomHead } from '../components/head';
import { editUserDetailsGQL, readUserDetailsGQL } from '../services/gqlClient';
import { Popup } from '../components/popup';
import { Loading } from '../components/loading';

import './edit.scss';

export class Edit extends Component {
  static async getInitialProps({ query }) {
    const { username } = query;
    return { username };
  }

  constructor(props) {
    super(props);
    this.state = {success: '', info: '', place: '', doc_id: '', loading: false};
  }

  componentDidMount() {
    this.setState({loading: true});
    this.readUserDetailsRequest()
  }

  readUserDetailsRequest = () => {
    readUserDetailsGQL(this.props.username)
      .then(response => {
          let {data: {readUserDetails: {success, info, user_details}}} = response;
          let {place, doc_id} = user_details;
          this.setState({success, info, place, doc_id, loading: false});
        })
      .catch(err => {
        console.error('readUserDetails API failed: ', err);
        this.setState({loading: false, info: 'Error reading user details', success: false});
      });
  }

  editUserDetailsRequest = () => {
    editUserDetailsGQL(this.props.username, this.state.place, this.state.doc_id)
      .then(response => {
          let {data: {editUserDetails: {success, info, user_details}}} = response;
          let {place, doc_id} = user_details;
          this.setState({success, info, place, doc_id, loading: false});
          setTimeout(() => this.redirect(`/user?username=${this.props.username}`), 1000);
        })
      .catch(err => {
        console.error('readUserDetails API failed: ', err);
        this.setState({loading: false, info: 'Error reading user details', success: false});
      });
  }

  onPlaceChange = (e) => {
    let place = e.target.value;
    this.setState({place});
  }
  onDocChange = (e) => {
    let doc_id = e.target.value;
    this.setState({doc_id});
  }

  onSubmit = () => {
    this.setState({loading: true})
    this.editUserDetailsRequest();
  }

  redirect = (url) => {
    window.location = url;
  }

  render () {
    let {place,  doc_id} = this.state;
    let {username} = this.props;
    return (
      <div>
        <CustomHead />
        <div className='container'>
          { this.state.info ? <Popup category={this.state.success ? 'info': 'error'} msg={this.state.info} /> : null}
          <Loading show={this.state.loading}/>
          <h3>Hello <em>{username}</em></h3>
          <h5>Edit Details: </h5>
		      <div className='user_details'>
		        <label htmlFor='place'>Place: </label>
		        <input type='text' name='place' value={place || ''} onChange={this.onPlaceChange} />
		        <label htmlFor='doc_id'>Doc ID: </label>
		        <input type='text' name='doc_id' value={doc_id || ''} onChange={this.onDocChange} />
		        <button onClick={this.onSubmit}>Update</button>
		      </div>
        </div>
      </div>
    )
  }
};

export default Edit;