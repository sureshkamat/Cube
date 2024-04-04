import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = ({ setSelectedCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [page]); // Fetch customers when the page changes

  const fetchCustomers = () => {
    setLoading(true);
    axios.get(`https://dummyjson.com/users?limit=10&page=${page}`)
      .then(response => {
        setCustomers(prevCustomers => [...prevCustomers, ...response.data.users]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setLoading(false);
      });
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage(prevPage => prevPage + 1); // Increment page when reaching the bottom
    }
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setSelectedId(customer.id);
  };

  return (
    <div className="customer-list" onScroll={handleScroll}>
      {customers.map(customer => (
        <div
          key={customer.id}
          onClick={() => handleCustomerClick(customer)}
          className={`customer-item ${selectedId === customer.id ? 'selected' : ''}`} 
          id='line'
        >
          <div className='user'>
            <p>{customer.firstName} - {customer.lastName}</p>
            <p>{customer.company.title}</p>
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default CustomerList;
