'use client';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import React from 'react';
import { house_test_data } from '@/app/component/fortest/house';
import HousePreview from './HousePreview';
import axios from 'axios';
import { estate_apis } from '../../api/api';
=======
import { house_test_data } from '@/app/component/fortest/house';
import HousePreview from './HousePreview';
import axios from 'axios';
>>>>>>> main

export default function BoardList() {
  // TODO: 정보 불러와서 집어넣기
  const [houses, setHouses] = useState();

  useEffect(() => {
    const getHouseInfo = async () => {
      try {
<<<<<<< HEAD
        const res = await estate_apis.get_board();
=======
        const res = await axios.get('');
>>>>>>> main
        setHouses(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getHouseInfo();
  }, [houses]);

  return (
    <section className='grid grid-cols-2 gap-y-8 w-full px-24'>
      {houses.map((house) => (
        <HousePreview key={house.id} house={house} />
      ))}
    </section>
  );
}
