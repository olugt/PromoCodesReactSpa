import logo from './logo.svg';
import './App.css';
import MainRouter from './routers/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header>

        </header>
        <main>
          <MainRouter />
        </main>
        <footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
