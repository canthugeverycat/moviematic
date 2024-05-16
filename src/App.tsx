import CSSModules from 'react-css-modules';
import styles from './App.module.scss';

import Title from './components/Title';
import MovieGrid from './components/MovieGrid';

const App = () => {
  return (
    <div styleName="App">
      <Title />
      <MovieGrid />
    </div>
  );
};

export default CSSModules(App, styles);
