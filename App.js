/* eslint-disable prettier/prettier */

import React, { useEffect } from 'react';
import { addAdmin, fetchAdminData } from './api/admin';

function App() {
  const fetchData = async () => {
    try {
      const dataList = await fetchAdminData();
      console.log(dataList);
    } catch (error) {
      console.error('Error fetching admin data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
    handleAddAdmin();
  }, []);

  const handleAddAdmin = async () => {
    try {
      const adminId = await addAdmin({
        first_name: 'Fas',
        last_name: 'arsh',
        email: 'nskjans',
        password: 'snkjn',
      });
      console.log('Admin added with ID: ', adminId);
    } catch (error) {
      console.error('Failed to add admin: ', error);
    }
  };
  return <></>;
}

export default App;
