// client/src/App.js
import React from 'react';
import InvoiceForm from './components/InvoiceForm';
import './App.css';

const App = () => {
  return (
    <div>
      <h1 className='main-heading'>Create Invoice</h1>
      <InvoiceForm />
    </div>
  );
};

export default App;
