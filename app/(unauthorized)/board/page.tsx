"use client";
import { estate_apis } from "@/app/api/api";
import { FilterProvider } from "@/app/component/Filter";
import Search from "@/app/component/board/Search";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <FilterProvider>
      <Board />
    </FilterProvider>
  );
}

function Board() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-sky-200 font-semibold ">
      <section className="w-full px-8 my-2 flex justify-between items-center gap-4">
        <BoardInfo />
        <Search data={{ data: [] }} className="absolute top-20 z-50 -right-3" />
      </section>
      <BoardList />
    </div>
  );
}

function BoardInfo() {
  return (
    <>
      {/* TODO: 공지사항 또는 주의사항 알아서 넣기 */}
      <p className="flex-grow rounded-xl bg-gray-300 py-2 text-center">
        PlatHome은 양도 매물을 조회하는 플랫폼입니다. 거래를 진행하실 때에는 주의해주세요.
      </p>
      <section className="h-max w-52 bg-white flex items-center gap-5 px-3 py-2 rounded-xl">
        <div className="rounded-md overflow-hidden border border-black w-6 h-6">
          <div className="bg-slate-300 h-1/3" />
          <div className="bg-white h-2/3" />
        </div>
        양도 매물 게시판
      </section>
    </>
  );
}

function BoardList() {
  // TODO: 정보 불러와서 집어넣기
  const [houses, setHouses] = useState<any[]>();

  useEffect(() => {
    const getHouseInfo = async () => {
      try {
        const res = await estate_apis.get_board();
        console.log(res);
        setHouses(res);
      } catch (error) {
        console.error(error);
      }
    };
    getHouseInfo();
  }, [houses]);

  if (houses === undefined) {
    return;
  }

  return (
    <section className="grid grid-cols-2 gap-y-8 w-full px-24">
      {houses.map((house: any) => (
        <HousePreview key={house.id} house={house} />
      ))}
    </section>
  );
}

const TYPE_CLASSNAME = "text-white text-xl rounded-full px-4 py-1.5";

function HousePreview({ house }: { house: any }) {
  return (
    // TODO: Link의 href 바꾸기
    <Link href={`/board/${house.id}`}>
      <article className="mx-auto w-[28rem] p-4 flex items-start gap-4 border-2 border-black rounded-xl bg-white font-semibold">
        <Image className="rounded-lg" src={house.thumbnail} alt="thumbnail" width={150} height={150} />
        <section className="flex-grow">
          <div className="flex justify-center gap-8 flex-grow">
            <div className={TYPE_CLASSNAME + " bg-orange-400"}>{house.roomType}</div>
            <div className={TYPE_CLASSNAME + " bg-violet-500"}>{house.paymentType}</div>
          </div>
          <section className="text-gray-500 mt-2">
            <p>
              {house.deposit}/{house.monthly} (관리비 {house.managementFee}만)
            </p>
            <p>
              {house.floor}층 {house.area}m<sup>2</sup>
            </p>
            <p className="break-words w-60 h-16 overflow-hidden text-clip whitespace-normal truncate">
              {house.description}
            </p>
          </section>
        </section>
      </article>
    </Link>
  );
}
