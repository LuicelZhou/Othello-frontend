import React, { Component } from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Rules from './components/Rules/Rules';
import MainPage from './components/MainPage/MainPage';
import './App.css';


class App extends Component {
  
  render() {

    return (
      <div className="App">

      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/game" element={<MainPage />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
      </BrowserRouter>

      </div>
    );
  }
}

export default App;
