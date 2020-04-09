import React, { Component } from 'react';
import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Footer from './component/layout/Footer';


class App extends Component {
      render() {
        return (
          <div className = "App">
          <Navbar/>
          <Landing/>
          <Footer/>
            
          </div>
        );
      }
    }
    export default App;
