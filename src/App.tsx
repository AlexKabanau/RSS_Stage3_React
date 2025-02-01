// import { useState } from 'react';
import './App.css';
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { ResponseType } from './api/getItems';
import ErrorButton from './components/ErrorButton';
import reactLogo from './assets/react.svg';

type StateType = {
  data: ResponseType[] | null;
  isLoading: boolean;
  isError: boolean;
};

class App extends React.Component {
  state: StateType = {
    data: [],
    isLoading: false,
    isError: false,
  };

  setIsLoading = (isLoading: boolean) => {
    // console.log(this.state.isLoading);
    this.setState({ isLoading });
    // console.log(this.state.isLoading);
  };

  setIsError = (isError: boolean) => {
    this.setState({ isError });
  };

  setData = (data: ResponseType[]) => {
    // console.log(data);
    this.setState({ data: data });
    // console.log(this.state);
  };

  // window.store = this.state;

  // document.store = this.state;

  // handleOnSubmit = (search: string) => {
  //   this.setState({ searchParams: search });
  //   // console.log(this.state.searchParams);
  // };

  render() {
    return (
      <div className="app">
        <Header
          handleResponse={this.setData}
          setIsLoading={this.setIsLoading}
          setIsError={this.setIsError}
        />
        {this.state.isLoading && (
          <div>
            <p>Loading...</p>
            <img src={reactLogo} className="logo" alt="loading" />
          </div>
        )}
        {this.state.isError && (
          <div>Some error occurred. Please try again.</div>
        )}
        {this.state.data && <Main items={this.state.data} />}
        <div className="error-container">
          <ErrorButton />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
