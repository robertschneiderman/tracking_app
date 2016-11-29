import React from 'react';
import Header from './header';

// const App = (props) => (
//   <div className="app">
//     <Header />
//     {props.children}
//   </div>
// );


class App extends React.Component {

  render() {
    return(
      <div className="appyyyyy">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;