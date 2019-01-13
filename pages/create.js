import {Component} from 'react';
import Router from 'next/router';
import { CustomHead } from '../components/head';

export class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '10', name: 'alen', place: 'kkd', doc_id: 'lksjlkd'};
  }

  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }
  componentDidMount() {
    // fetch user details from appolo;
  }

  navigate = () => {
    return Router.push(`/update?id=${this.state.id}`)
  }
  render() {
    return(
      <div>
        <CustomHead />
        Hello {this.state.name}
        <div>your details</div>
        <div>
          <span>Place: {this.state.place}</span>
          <br />
          <span>Doc Id: {this.state.doc_id}</span>
          <br />
          <button onClick={this.navigate}>Edit</button>
        </div>
      </div>
    )
  }
}

export default Create;