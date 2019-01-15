import './loading.scss';

export const Loading = ({show}) => (
  <div className={`loading ${show ? 'show': 'hide'}`}>
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  </div>
);
export default Loading;