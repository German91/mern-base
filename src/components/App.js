import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { title: 'Hello World' };
  }

  render() {
    const env = process.env.NODE_ENV;

    return (
      <div className="welcome">
        <h1>{ this.state.title }</h1>
        <p>{ env }</p>
      </div>
    );
  }
}

export default App;
