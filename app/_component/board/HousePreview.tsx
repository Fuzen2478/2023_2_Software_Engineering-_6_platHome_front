import { houseInfoType } from '../../_model/house';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  house: houseInfoType;
};

const TYPE_CLASSNAME = 'text-white text-xl rounded-full px-4 py-1.5';

export default function HousePreview({ house }: Props) {
  return (
    // TODO: Link의 href 바꾸기
    <Link href={`/board/${house.id}`}>
      <article className='mx-auto w-[28rem] p-4 flex items-start gap-4 border-2 border-black rounded-xl bg-white font-semibold'>
        <Image
          className='rounded-lg'
          src={house.thumbnail}
          alt='thumbnail'
          width={150}
          height={150}
        />
        <section className='flex-grow'>
          <div className='flex justify-center gap-8 flex-grow'>
            <div className={TYPE_CLASSNAME + ' bg-orange-400'}>
              {house.roomType}
            </div>
            <div className={TYPE_CLASSNAME + ' bg-violet-500'}>
              {house.paymentType}
            </div>
          </div>
          <section className='text-gray-500 mt-2'>
            <p>
              {house.deposit}/{house.monthly} (관리비 {house.managementFee}만)
            </p>
            <p>
              {house.floor}층 {house.area}m<sup>2</sup>
            </p>
            <p className='break-words w-60 h-16 overflow-hidden text-clip whitespace-normal truncate'>
              {house.description}
            </p>
          </section>
        </section>
      </article>
    </Link>
  );
}
