import React from 'react';

import { Header } from './components/Header';
import { Board } from './components/Board';
import { TodoProvider } from './context/TodoProvider';

import './app.scss';

function App(): JSX.Element {
  return (
    <div className="app">
      <TodoProvider>
        <Header />
        <Board />
      </TodoProvider>
    </div>
  );
}

export default App;
