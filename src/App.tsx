// import { useState } from 'react';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    searchParams: '',
  };

  handleOnSubmit = (search: string) => {
    this.setState({ searchParams: search });
    console.log(this.state.searchParams);
  };

  render() {
    return (
      <>
        <Header handleOnSubmit={this.handleOnSubmit} />
        <Main />
        <Footer />
      </>
    );
  }
}

export default App;
