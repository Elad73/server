import React from 'react';
import family from '../images/family.png';
import '../App.css';

const Landing = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={family} className="App-logo" alt="logo" />
        <h2>Welcome to FAMILY manager</h2>
        <a className="App-link" href="/auth/google" rel="noopener noreferrer">
          Sign In With Google
        </a>
      </header>
    </div>
  );
};

export default Landing;
