/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {fetchAdminData} from './api/admin';



import AdminMainScreen from './components/admin/AdminMainScreen'

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
  }, []);
  return <></>;
}

export default App;
