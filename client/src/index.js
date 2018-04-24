import '../dist/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Don't forget to add your API key
filepicker.setKey('A23FSrXhUQ6SvbdamJguEz');

console.log('Index loaded');

// Our views are rendered inside the #content div
ReactDOM.render(
  <App />,
  document.getElementById('root')
);