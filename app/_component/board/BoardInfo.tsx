export default function BoardInfo() {
  return (
    <>
      {/* TODO: 공지사항 또는 주의사항 알아서 넣기 */}
      <p className='flex-grow rounded-xl bg-gray-300 py-2 text-center'>
        이 빈공간은 간략한 공지사항이나 주의사항을 넣으면 될 것 같습니다.
      </p>
      <section className='h-max w-52 bg-white flex items-center gap-5 px-3 py-2 rounded-xl'>
        <div className='rounded-md overflow-hidden border border-black w-6 h-6'>
          <div className='bg-slate-300 h-1/3' />
          <div className='bg-white h-2/3' />
        </div>
        양도 매물 게시판
      </section>
    </>
  );
}
