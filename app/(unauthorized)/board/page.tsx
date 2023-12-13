"use client";
import { estate_apis, wishlist_apis } from "@/app/api/api";
import Filter, { FilterProvider, useFilter } from "@/app/component/Filter";
import Search from "@/app/component/board/Search";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IFilter } from "@/app/component/Filter/const";
import { IEstateStringConvert } from "@/app/component/interface";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

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
        PlatHome은 양도 매물을 조회하는 플랫폼입니다. 거래를 진행하실 때에는 주의해주세요.
      </p>
      <section className="h-max w-52 bg-white flex items-center gap-5 px-3 py-2 rounded-xl">
        <div className="rounded-md overflow-hidden border border-black w-6 h-6">
          <div className="bg-slate-300 h-1/3" />
          <div className="bg-white h-2/3" />
        </div>
        양도 매물 게시판
      </section>
      <Search data={{ data: [] }} />

      <Filter />
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
        setHouses(res);
      } catch (error) {
        console.error(error);
      }
    };
    const getWishList = async () => {
      try {
        const res = await wishlist_apis.get_wishlist();
        const pro = res.map((item: any) => item.estateId);
        setWishlist(pro);
      } catch (error) {
        console.error(error);
      }
    };
    getHouseInfo();
    getWishList();
  }, [filter]);

  if (houses === undefined) {
    return;
  }

  return (
    <section className="flex flex-wrap gap-x-8 gap-y-4 w-full px-8 py-4">
      {houses.map((item: any) => {
        const isWish = wishlist?.includes(item.estateId) ?? false;
        return <HousePreview key={item.memberId} house={item} isWish={isWish} />;
      })}
    </section>
  );
}

const TYPE_CLASSNAME = "text-white text-xl rounded-full px-4 py-1.5";

function HousePreview({ house, isWish }: { house: any; isWish: boolean }) {
  const router = useRouter();
  const [estate, setEstate] = useState<any>();

  useEffect(() => {
    const fetch = async () => {
      const res = await estate_apis.get(Number(house.estateId));
      setEstate(res);
    };
    fetch();
  }, []);

  return (
    // TODO: Link의 href 바꾸기
    <div className="w-[28rem]" key={house.memberId}>
      <article className="mx-auto w-[28rem] p-4 flex items-start gap-4 border-2 border-black rounded-xl bg-white font-semibold">
        <Image
          className="rounded-lg cursor-pointer"
          src={house.thumbNailUrl ?? ""}
          alt="thumbnail"
          width={150}
          height={150}
          onClick={() => {
            router.push(`/board/${house.estateId}`);
          }}
        />
        <section className="flex-grow">
          <div className="flex justify-center gap-8 flex-grow">
            <div className={TYPE_CLASSNAME + " bg-orange-400"}>
              {IEstateStringConvert[house.roomType as keyof typeof IEstateStringConvert]}
            </div>
            <div className={TYPE_CLASSNAME + " bg-violet-500"}>
              {IEstateStringConvert[house.rentalType as keyof typeof IEstateStringConvert]}
            </div>
            <Star
              className={"w-8 h-8 " + (isWish === true ? "text-yellow-400" : "text-black")}
              onClick={() => {
                if (isWish) {
                  //wishlist 삭제
                  wishlist_apis.remove_wishlist(house.estateId);
                } else {
                  //wishlist 추가
                  wishlist_apis.add_wishlist(house.estateId);
                }
              }}
            />
          </div>
          <section
            className="text-gray-500 mt-2 cursor-pointer"
            onClick={() => router.push(`/board/${house.estateId}`)}
          >
            <p>
              {estate?.deposit?.toLocaleString()} / {estate?.monthlyRent?.toLocaleString()} (관리비{" "}
              {estate?.maintenanceFee / 10000}만)
            </p>
            <p>
              {IEstateStringConvert[estate?.floor as keyof typeof IEstateStringConvert]} {estate?.squareFeet}m
              <sup>3</sup>
            </p>
            <p className="break-words w-60 h-16 overflow-hidden text-clip whitespace-normal truncate">
              {estate?.description}
            </p>
          </section>
        </section>
      </article>
    </div>
  );
}
