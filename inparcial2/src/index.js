import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg" width="30" height="30" alt=""></img>
      </a>
    </nav>
    <br></br> 
    <App />
  </React.StrictMode>
);

reportWebVitals();
