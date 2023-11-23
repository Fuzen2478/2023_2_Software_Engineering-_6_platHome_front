'use client';

import { houseInfoType } from '../../_model/house';
import HousePreview from './HousePreview';

export default function BoardList() {
  // TODO: 정보 불러와서 집어넣기
  const data: houseInfoType[] = [
    {
      id: 1,
      roomType: '원룸',
      paymentType: '월세',
      deposit: 1000,
      monthly: 50,
      managementFee: 6,
      floor: 2,
      area: 14.71,
      description:
        '추가 설명 일부분 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      roomType: '원룸',
      paymentType: '월세',
      deposit: 1000,
      monthly: 50,
      managementFee: 6,
      floor: 2,
      area: 14.71,
      description: '추가 설명 일부분 ~~~~~~~~~~~~~~~~',
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      roomType: '원룸',
      paymentType: '월세',
      deposit: 1000,
      monthly: 50,
      managementFee: 6,
      floor: 2,
      area: 14.71,
      description: '추가 설명 일부분 ~~~~~~~~~~~~~~~~',
      thumbnail: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      roomType: '원룸',
      paymentType: '월세',
      deposit: 1000,
      monthly: 50,
      managementFee: 6,
      floor: 2,
      area: 14.71,
      description: '추가 설명 일부분 ~~~~~~~~~~~~~~~~',
      thumbnail: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <section className='grid grid-cols-2 gap-y-8 w-full px-24'>
      {data.map((house) => (
        <HousePreview key={house.id} house={house} />
      ))}
    </section>
  );
}
