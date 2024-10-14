import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('هذه بيانات إضافية يمكنك إضافتها');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://y-sooty-seven.vercel.app/api/api/loggedInUser');
        setUserData(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6">
          {userData ? (
            <div className="user-info">
              <img src={userData.image_url} alt="User" className="img-fluid" />
              <h2>{userData.name}</h2>
              <p>رقم: {userData.phone}</p>
              <p>Address: Cairo</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>


        <div className="col-6">
          <div className="header">
            <h1>Sakny Shokran Group</h1>
            <p>licensed as Sakny Realty Group</p>
          </div>
          <div className="aboutContent mt-5">
            <h5 className=''>About Sakny Realty Group</h5>
            <hr className='w-25'/>
            <p>The Sakny Realty Group represents a wide demographic of Sellers and Buyers, from single-family homes and condominiums to vacant land, multi-use properties, and luxury properties. Their business covers the greater Contra Costa County, Alameda County, and the Tri-County areas. We are committed to bringing each client personal service, excellent communication, and extensive knowledge and education throughout their transaction.</p>
          </div>
          <hr />
          <div className="info d-flex gap-5">
            <div className="lang d-flex flex-column">
              <strong>Languages</strong>
              <span>English</span>
            </div>
            <div className="licens d-flex flex-column">
              <strong>Licenses</strong>
              <span>CA 01380025</span>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}
