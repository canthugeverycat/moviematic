import Title from './components/Title';
import MovieGrid from './components/MovieGrid';

import './App.scss';

/**
 * Main container for the app
 * 
 * @returns {React.ReactElement}
 */
const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Title />
      <MovieGrid />
    </div>
  );
};

export default App;
