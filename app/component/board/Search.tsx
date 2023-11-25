'use client';

import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { houseInfoType } from '@/app/_model/house';

interface SearchProps {
  data: houseInfoType[];
}
const Search = ({ data }: SearchProps) => {
  const [word, setWord] = useState<string>('');

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (word.length === 0) return;
    //TODO: word를 이용해 검색하기 구현
    const filteredData = data.filter(
      (house) => house.id.toString() === word.toString()
    );
    if (filteredData.length === 0) {
      alert(`검색어: ${word}`);
    } else {
      console.log(filteredData);
    }
    setWord('');
  };

  return (
    <form className='w-72 flex items-center gap-2' onSubmit={search}>
      <input
        className='bg-white/50 border border-black rounded-lg px-1.5 py-0.5 focus:outline-none'
        type='text'
        placeholder='주소, 건물명'
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button className='rounded-full bg-gray-400 w-7 h-7 flex items-center justify-center'>
        <BiSearchAlt className='w-6 h-6 text-white' />
      </button>
    </form>
  );
};
export default Search;
