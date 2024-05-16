import CSSModules from 'react-css-modules';
import styles from './App.module.scss';

import Title from './components/Title';

const App = () => {
  return (
    <div styleName="App">
      <Title />
    </div>
  );
};

export default CSSModules(App, styles);
