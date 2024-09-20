import './App.css';

import { Container } from './components/common/layouts/Container'; // Container 컴포넌트 import
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container
          maxWidth="1200px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Container>
      </header>
    </div>
  );
}

export default App;
