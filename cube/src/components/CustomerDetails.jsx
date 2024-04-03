import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CustomerDetails = ({ customer }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = () => {
      if (customer) {
        const photoPromises = [...Array(9)].map((_, index) => {
          return axios.get(`https://source.unsplash.com/random/100x100?sig=${customer.id + index}`)
            .then(response => response.request.responseURL)
            .catch(error => {
              console.error('Error fetching photos:', error);
              return '';
            });
        });

        Promise.all(photoPromises)
          .then(newPhotos => {
            setPhotos(newPhotos);
          });
      }
    };

    fetchPhotos();
    const interval = setInterval(fetchPhotos, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [customer]);

  if (!customer) {
    return (
      <div className="customer-details">
        <h2>Customer Details</h2>
        <p>Please select a customer</p>
      </div>
    );
  }

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <div className='customer'>
        <div>
          <h3>First Name: {customer.first_name}</h3>
          <h3>Last Name: {customer.last_name}</h3>
        </div>
        <img src={customer.avatar} alt='avatar' className='avatar'/>
      </div>
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index + 1}`} className="photo" />
        ))}
      </div>
    </div>
  );
}

export default CustomerDetails;
