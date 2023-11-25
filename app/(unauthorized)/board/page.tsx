'use client';
import BoardInfo from '@/app/component/board/BoardInfo';
import BoardList from '@/app/component/board/BoardList';
import Search from '@/app/component/board/Search';

export default function Board() {
  return (
    <div className='w-full h-screen flex flex-col items-center bg-sky-200 font-semibold '>
      <section className='w-full px-8 my-2 flex justify-between items-center gap-4'>
        <BoardInfo />
        <Search />
      </section>
      <BoardList />
    </div>
  );
}
