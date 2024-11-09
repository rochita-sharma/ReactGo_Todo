import React from 'react';
import './App.css';
import {Container} from "semantic-ui-react";
import ToDo from "./To-Do";

function App() {
  return (
    <div>
    <Container>
      <ToDo />
    </Container>
    </div>
  );
}

export default App;