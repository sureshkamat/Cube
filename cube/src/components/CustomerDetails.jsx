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
          <h2>{customer.firstName} {customer.lastName}</h2>
          <p>{customer.username}</p>
          <p>{customer.company.department}</p>
          <hp>{customer.address.address},{customer.address.city},{customer.address.postalCode},{customer.address.state}</hp>
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
