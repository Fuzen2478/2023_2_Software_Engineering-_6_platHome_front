"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { SendImage, sendMessage, useChatSocket } from "../(authorized)/chat/Socket";
import { account_apis, chat_apis, estate_apis } from "../api/api";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import Search from "../component/board/Search";
import Filter, { FilterProvider, useFilter } from "../component/Filter";
import { IFilter } from "../component/Filter/const";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { IEstateStringConvert } from "../component/interface";

export default function Home() {
  return (
    <FilterProvider>
      <Container />
    </FilterProvider>
  );
}

function Container() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [estate, setEstate] = useState<Array<any> | null>(null);

  const { filterOption, setFilterOption, showFilter, setShowFilter } = useFilter();
  const [selectedData, setSelectedData] = useState<any>(null);
  const [clusteredData, setClusteredData] = useState<{ id: number; location: string }[]>();

  const clusterClick = (_target: any, cluster: any) => {
    let temp: any[] = [];
    cluster._markers.map((item: any) => {
      const t = item.a.innerText.split(", ");
      temp.push({ id: Number(t[0]), location: t[1] });
    });
    setClusteredData(temp);
  };

  useEffect(() => {
    async function fetchData(filterOption: IFilter) {
      const res = await estate_apis.get_map(filterOption);
      setEstate(res);
    }
    fetchData(filterOption);
  }, [filterOption]);

  return (
    <div className="main-content max-h-[calc(100vh-5rem)] max-w-[100vw]">
      <Map center={{ lat: 37.279516, lng: 127.042636 }} style={{ width: "100%", height: "calc(100vh - 4rem)" }}>
        <MarkerClusterer averageCenter minLevel={1} disableClickZoom onClusterclick={clusterClick}>
          {typeof estate !== null &&
            estate?.map((item: any) => {
              const position = { lat: Number(item.lng), lng: Number(item.lat) };
              return (
                <CustomOverlayMap key={item.memberId} position={position}>
                  <div
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-cetner rounded-full border-2 border-black bg-red-500 w-[1.5rem] h-[1.5rem] cursor-pointer"
                    onClick={() => {
                      setSelectedData(item);
                    }}
                  >
                    {" "}
                  </div>
                  <div className="identify hidden">
                    {item.estateId}, {item.location}
                  </div>
                </CustomOverlayMap>
              );
            })}
        </MarkerClusterer>
      </Map>
      <Search data={{ data: [] }} className="absolute top-20 z-50 -right-3" />
      {/* <div
        className="absolute top-28 right-0 z-50 rounded-lg bg-black text-white w-fit py-1 px-2"
        onClick={async (e) =>
          {
            e.preventDefault();
            const res = await account_apis.get_token();
          }
        }
      >
        메세지 보내기
      </div>
      <div
        className="absolute top-28 right-32 z-50 rounded-lg bg-black text-white w-fit py-1 px-2"
        onClick={() => {
          chat_apis.createRoom({
            name: "테스트",
            seller_id: 1,
            seller_nickname: "tt",
            buyer_nickname: "fuzen",
            estate_id: 1,
          });
        }}
      >
        채팅방 생성
      </div> */}
      {/* 선택된 매물 */}
      {selectedData !== null && (
        <Card
          className="absolute bottom-4 right-4 z-50 rounded-lg border-2 border-primary bg-slate-100 py-2 px-4 content-start cursor-pointer font-bold"
          onPress={() => {
            router.push(`/board/${selectedData.estateId}`);
          }}
        >
          <CardHeader>{selectedData.location}</CardHeader>
          <CardBody
            onClick={() => {
              router.push(`/board/${selectedData.estateId}`);
            }}
          >
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2 content-start font-bold">
                <Chip>{IEstateStringConvert[selectedData.rentalType as keyof typeof IEstateStringConvert]}</Chip>
                <Chip>{IEstateStringConvert[selectedData.roomType as keyof typeof IEstateStringConvert]}</Chip>
                <Chip>보증금 : {selectedData.deposit.toLocaleString()}</Chip>
                <Chip>월세 : {selectedData.monthlyRent.toLocaleString()}</Chip>
                <Chip>{IEstateStringConvert[selectedData.floor as keyof typeof IEstateStringConvert]}</Chip>
                <Chip>{selectedData.squareFeet} 평</Chip>
                <Chip>관리비 : {selectedData.maintenanceFee.toLocaleString()}</Chip>
              </div>
              <img src={selectedData.thumbnailUrl} />
            </div>
          </CardBody>
        </Card>
      )}
      {/* 겹쳐진 매물 */}
      {clusteredData !== undefined && (
        <Card className="absolute bottom-4 right-4 z-40 rounded-lg border-2 border-primary bg-slate-100 py-2 px-4 content-start cursor-pointer font-bold">
          <CardBody>
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2 content-start font-bold">
                {clusteredData.map((item) => {
                  return (
                    <Chip
                      onClick={() => {
                        const temp = estate?.filter((estate) => estate.estateId === item.id);
                        if (temp === undefined) return false;
                        setSelectedData(temp[0]);
                      }}
                    >
                      {item.location}
                    </Chip>
                  );
                })}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      <Filter />
    </div>
  );
}
