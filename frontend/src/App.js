import React from 'react';
import './global.css';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure();



function App() {
  
  return (
    <Routes />
  );
}

export default App;
