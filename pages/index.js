import { Component } from 'react';
import { CustomHead } from '../components/head';

import './index.scss';

 export class Welcome extends Component {
   navigate = (url) => {
     window.location = url;
   }
   render() {
     return (
       <div>
         <CustomHead />
         <div className='container'>
           <div className='row'><div className='two column'></div></div>
           <h3>Welcome to landing page</h3>
           <button onClick={() => this.navigate('/login')}>Login here</button>
           <button onClick={() => this.navigate('/register')}>Register here</button>
         </div>
       </div>
     )
   }
 }
 export default Welcome;