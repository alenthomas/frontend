import { Component } from 'react';
import { CustomHead } from '../components/head';
import { readUserDetailsGQL, getDocDetailsGQL, uploadDocGQL } from '../services/gqlClient';
import { Popup } from '../components/popup';
import { Loading } from '../components/loading';
import { getBase64 } from '../utils';

import './user.scss';

export class Upload extends Component {
  static async getInitialProps({ query }) {
    const {username} = query;
    return { username };
  }

  constructor(props) {
    super(props);
    this.state = {
      info: null, success: null, type: null, file: null, loading: false
    };
  }

  uploadDocumentRequest = () => {
    uploadDocGQL(this.props.username, this.state.type, this.state.file)
      .then(response => {
        let {data: {uploadDoc: {success, info, doc_details}}} = response;
        if(success) {
          this.setState({info, success, loading: false})
          setTimeout(() => this.redirect(`/user?username=${this.props.username}`), 1000);
        } else {
          this.setState({info, success, loading: false});
        }
      })
      .catch(err => {
        console.error('uploadDoc API failed: ', err);
        this.setState({info: 'Error uploading doc', success: false, loading: false});
      });
  }

  

  redirect = (url) => {
    window.location = url;
  }

  renderPopUp(info) {
    if(info) {
      return (
        <Popup category={this.state.success ? 'info': 'error'} msg={this.state.info} />
      )
    }
    return null;
  }

  getFileExtension = (file) => {
    var a = file.toString().split(".");
      if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
        return "";
      }
      return a.pop();
    }

  uploadFile = () => {
    let fileObj = document.getElementById('fileToUpload');
    if(fileObj.value) {
      this.setState({loading: true});
      let extension = this.getFileExtension(fileObj.value);
      getBase64(fileObj.files[0])
        .then(file => {
          this.setState({info: 'Processing file upload', success: true, type: extension, file})
          this.uploadDocumentRequest();
        })

    }
    this.setState({info: 'Please upload a file', success: false, loading: false});
  }

  render () {
    let {username} = this.props;
    return (
      <div>
        <CustomHead />
        <div className='container'>
          {this.renderPopUp(this.state.info)}
          <Loading show={this.state.loading}/>
          <h3>Hello <em>{username}</em></h3>
          <div className='upload_details'>
            <div className='doc'>
              <input type='file' name='fileToUpload' id='fileToUpload' />
            </div>
          </div>
          <button className='button button-primary'onClick={this.uploadFile}>Upload Doc</button>
          <button className='button' onClick={() => this.redirect(`/user?username=${username}`)}>Cancel</button>
        </div>
      </div>
    )
  }
};

export default Upload;