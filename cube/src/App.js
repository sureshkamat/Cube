import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import './App.css'
import CustomerDetails from './components/CustomerDetails';

const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="App">
      <CustomerList setSelectedCustomer={setSelectedCustomer} />
      <CustomerDetails customer={selectedCustomer} />
    </div>
  );
}

export default App;
