import { Component } from 'react';
import { CustomHead } from '../components/head';

 export class Welcome extends Component {
   navigate = (url) => {
     window.location = url;
   }
   render() {
     return (
       <div>
         <CustomHead />
         <h3>Welcome to landing page</h3>
         <div onClick={() => this.navigate('/login')}>Login here</div>
         <div onClick={() => this.navigate('/register')}>Register here</div>
       </div>
     )
   }
 }
 export default Welcome;