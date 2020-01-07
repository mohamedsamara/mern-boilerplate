import React from 'react';

class App extends React.Component {
  componentDidMount() {
    fetch('/api/book')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <ul>Test</ul>;
  }
}

export default App;
