import CSSModules from 'react-css-modules';
import styles from './App.module.scss';

const App = () => {
  return (
    <div styleName="App"></div>
  );
};

export default CSSModules(App, styles);
