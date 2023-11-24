import BoardInfo from '@/components/board/BoardInfo';
import BoardList from '@/components/board/BoardList';
import Search from '@/components/board/Search';

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
