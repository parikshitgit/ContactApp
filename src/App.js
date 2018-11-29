import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Component/Contacts.css'
import ContactDisplay from './Component/ContactDisplay'


class App extends React.Component {
constructor() {
    super();

}


  render() {
    return (
      <div className="App">



    <ContactDisplay/>



      </div>


    );
  }
}

export default App;
