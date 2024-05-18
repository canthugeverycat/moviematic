import Title from './components/Title';
import MovieGrid from './components/MovieGrid';

import './App.scss';
import Header from './components/Header';

/**
 * Main container for the app
 * 
 * @returns {React.ReactElement}
 */
const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Title />
      <Header />
      <MovieGrid />
    </div>
  );
};

export default App;
