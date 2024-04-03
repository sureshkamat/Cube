import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = ({ setSelectedCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  
  useEffect(() => {
    axios.get('https://reqres.in/api/users?per_page=20')
      .then(response => {

        setCustomers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setSelectedId(customer.id);
  };

  return (
    <div className="customer-list">
      
      {customers.map(customer => (
        <div
          key={customer.id}
          onClick={() => handleCustomerClick(customer)}
          className={`customer-item ${selectedId === customer.id ? 'selected' : ''}`} 
          id='line'
        >
          <div className='user'>
            <p>{customer.first_name} - {customer.last_name}</p>
            <p>{customer.email}</p>
          </div>

        </div>
      ))}
    </div>
  );
}

export default CustomerList;
