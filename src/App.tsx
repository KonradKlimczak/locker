import challenge from './challenge.json';

import { Table } from './components';

import { useMemo } from 'react';
import { getData } from './utils';

import './App.css';
function App() {
  const data = useMemo(() => getData(challenge), []);

  return (
    <div className="App">
      <header className="App-header">I know nothing about golf</header>
      <main className="App-main">
        <Table data={data} />
      </main>
    </div>
  );
}

export default App;
