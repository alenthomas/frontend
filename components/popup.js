import './popup.scss';

export const Popup = ({category='default', msg=''}) => (
  <div className={`popup ${category}`}>
    <div className={`${category}`}></div>
    <div className='msg'>{msg}</div>
  </div>
);
export default Popup;