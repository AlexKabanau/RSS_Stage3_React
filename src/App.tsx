import './App.css';
// import React from 'react';
// import Header from './components/Header';
// import Main from './components/Main';
// import Footer from './components/Footer';
// import { ResponseType } from './api/getItems';
// import ErrorButton from './components/ErrorButton';
// import reactLogo from './assets/react.svg';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NotFoundPager from './pages/NotFoundPager';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="starship/:id" element={<CartPage />} />
        <Route path="*" element={<NotFoundPager />} />
      </Routes>
    </BrowserRouter>
  );
};

// type StateType = {
//   data: ResponseType[] | null;
//   isLoading: boolean;
//   isError: boolean;
// };

// class App extends React.Component {
//   state: StateType = {
//     data: [],
//     isLoading: false,
//     isError: false,
//   };

//   setIsLoading = (isLoading: boolean) => {
//     this.setState({ isLoading });
//   };

//   setIsError = (isError: boolean) => {
//     this.setState({ isError });
//   };

//   setData = (data: ResponseType[]) => {
//     this.setState({ data: data });
//   };

//   render() {
//     return (
//       <div className="app">
//         <Header
//           handleResponse={this.setData}
//           setIsLoading={this.setIsLoading}
//           setIsError={this.setIsError}
//         />
//         {this.state.isLoading && (
//           <div>
//             <p>Loading...</p>
//             <img src={reactLogo} className="logo" alt="loading" />
//           </div>
//         )}
//         {this.state.isError && (
//           <div>Some error occurred. Please try again.</div>
//         )}
//         {this.state.data && <Main items={this.state.data} />}
//         <div className="error-container">
//           <ErrorButton />
//         </div>

//         <Footer />
//       </div>
//     );
//   }
// }

export default App;
