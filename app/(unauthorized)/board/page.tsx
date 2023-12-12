"use client";
import { estate_apis, wishlist_apis } from "@/app/api/api";
import { FilterProvider, useFilter } from "@/app/component/Filter";
import Search from "@/app/component/board/Search";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IFilter } from "@/app/component/Filter/const";
import { IEstateStringConvert } from "@/app/component/interface";
import { Star } from "lucide-react";

export default function Home() {
  return (
    <FilterProvider>
      <Board />
    </FilterProvider>
  );
}

function Board() {
  const { filterOption, setFilterOption } = useFilter();
  return (
    <div className="w-full h-screen flex flex-col bg-sky-200 font-semibold ">
      <section className="w-full px-8 my-2 flex justify-start items-center gap-4 justify-items-start">
        <BoardInfo />
      </section>
      <BoardList filter={filterOption} />
    </div>
  );
}

function BoardInfo() {
  return (
    <>
      {/* TODO: 공지사항 또는 주의사항 알아서 넣기 */}
      <p className="rounded-xl grow bg-gray-300 py-2 px-4 text-center">
        PlatHome은 양도 매물을 조회하는 플랫폼입니다. 거래를 진행하실 때에는
        주의해주세요.
      </p>
      <section className="h-max w-52 bg-white flex items-center gap-5 px-3 py-2 rounded-xl">
        <div className="rounded-md overflow-hidden border border-black w-6 h-6">
          <div className="bg-slate-300 h-1/3" />
          <div className="bg-white h-2/3" />
        </div>
        양도 매물 게시판
      </section>
      <Search data={{ data: [] }} />
    </>
  );
}

function BoardList({ filter }: { filter: IFilter }) {
  // TODO: 정보 불러와서 집어넣기
  const [houses, setHouses] = useState<any[]>();
  const [wishlist, setWishlist] = useState<any[]>();

  useEffect(() => {
    const getHouseInfo = async () => {
      try {
        const res = await estate_apis.get_board(filter);
        console.log(res);
        setHouses(res);
      } catch (error) {
        console.error(error);
      }
    };
    const getWishList = async () => {
      try {
        const res = await wishlist_apis.get_wishlist();
        console.log(res);
        setWishlist(res);
      } catch (error) {
        console.error(error);
      }
    };
    getHouseInfo();
  }, [filter]);

  if (houses === undefined) {
    return;
  }

  return (
    <section className="flex flex-col gap-y-8 w-full px-8 py-4">
      {houses.map((item: any) => {
        const isWish = wishlist?.find(
          (wish) => wish.memberId === item.memberId
        );
        return (
          <HousePreview key={item.memberId} house={item} isWish={isWish} />
        );
      })}
    </section>
  );
}

const TYPE_CLASSNAME = "text-white text-xl rounded-full px-4 py-1.5";

function HousePreview({ house, isWish }: { house: any; isWish: boolean }) {
  return (
    // TODO: Link의 href 바꾸기
    <Link href={`/board/${house.memberId}`} className="w-[28rem]">
      <article className="mx-auto w-[28rem] p-4 flex items-start gap-4 border-2 border-black rounded-xl bg-white font-semibold">
        <Image
          className="rounded-lg"
          src={
            house.thumbNailUrl ??
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhouse&psig=AOvVaw2ckZzaGL-lrsiGYzsjsNaJ&ust=1702454127958000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPj0gP-1iYMDFQAAAAAdAAAAABAD"
          }
          alt="thumbnail"
          width={150}
          height={150}
        />
        <section className="flex-grow">
          <div className="flex justify-center gap-8 flex-grow">
            <div className={TYPE_CLASSNAME + " bg-orange-400"}>
              {house.roomType}
            </div>
            <div className={TYPE_CLASSNAME + " bg-violet-500"}>
              {
                IEstateStringConvert[
                  house.rentalType as keyof typeof IEstateStringConvert
                ]
              }
            </div>
            <Star
              className={"w-8 h-8 " + isWish ? "text-black" : "text-yellow-400"}
              onClick={() => {
                if (isWish) {
                  //wishlist 제거
                } else {
                  //wishlist 추가
                }
              }}
            />
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
