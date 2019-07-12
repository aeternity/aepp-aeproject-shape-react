import React from 'react';
import './App.css';
import TodoManager from './components/ToDoManager'
import uuid from 'uuid/v4'

console.log('=====> uuid', uuid());

function App() {
  return (
    <div className="App">
      <TodoManager key={uuid()}></TodoManager>
    </div>
  );
}

export default App;
