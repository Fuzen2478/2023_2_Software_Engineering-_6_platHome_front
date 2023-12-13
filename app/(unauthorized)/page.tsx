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
import { Card, CardBody, CardHeader } from "@nextui-org/react";

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

  const onChangeImage = (e: any) => {
    SendImage("6561ad0a36440fbdec157bb9", 1, "bullshit", e.target.files[0]);
    chat_apis.uploadImage(e.target.files[0]);
  };

  useEffect(() => {
    async function fetchData(filterOption: IFilter) {
      const res = await estate_apis.get_map(filterOption);
      setEstate(res);
    }
    fetchData(filterOption);
  }, [filterOption]);

  useEffect(() => {
    // console.log("estate data length: ", estate?.length);
    // console.log("estate data: ", estate);
  });

  return (
    <div className="main-content max-h-[calc(100vh-5rem)] max-w-[100vw]">
      <Map center={{ lat: 37.279516, lng: 127.042636 }} style={{ width: "100%", height: "calc(100vh - 4rem)" }}>
        <MarkerClusterer averageCenter minLevel={1} disableClickZoom>
          {typeof estate !== null &&
            estate?.map((item: any) => {
              const position = { lat: Number(item.lng), lng: Number(item.lat) };
              // console.log("position: ", position);
              return (
                <CustomOverlayMap key={item.memberId} position={position}>
                  <div
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-cetner rounded-full border-2 border-black bg-red-500 w-[1.5rem] h-[1.5rem]"
                    onClick={() => setSelectedData(item)}
                  >
                    {" "}
                  </div>
                </CustomOverlayMap>
              );
            })}
        </MarkerClusterer>
      </Map>
      <Search data={{ data: [] }} className="absolute top-20 z-50 -right-3" />
      <div
        className="absolute top-28 right-0 z-50 rounded-lg bg-black text-white w-fit py-1 px-2"
        onClick={async (e) =>
          // sendMessage(
          //   "6564384908a74320c964fbab",
          //   5,
          //   "fuzen",
          //   "메세지 잘 가나요?"
          // )
          {
            e.preventDefault();
            const res = await account_apis.get_token();
            // console.log("res: ", res);
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
      </div>
      {selectedData !== null && (
        <Card
          className="absolute bottom-4 right-4 z-50 rounded-lg border-2 border-primary bg-slate-100 py-2 px-4 content-start cursor-pointer"
          // onPress={() => {
          //   console.log("?");
          //   router.push(`/board/${selectedData.estateId}`);
          // }}
        >
          <CardHeader>{selectedData.location}</CardHeader>
          <CardBody
            onClick={() => {
              router.push(`/board/${selectedData.estateId}`);
            }}
          >
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2 content-start">
                <p>{selectedData.rentalType}</p>
                <p>{selectedData.roomType}</p>
                <p>{selectedData.deposit}</p>
                <p>{selectedData.monthlyRent}</p>
                <p>{selectedData.floor}</p>
                <p>{selectedData.squareFeet}</p>
                <p>{selectedData.maintenanceFee}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      <Filter />
    </div>
  );
}

{
  /* <input
        type="file"
        accept={"image/jpeg" || "image/HEIC" || "image/jpg"}
        onChange={(e) => onChangeImage(e)}
      /> */
}

// enterChatRoom //  {
//   roomId: string;
// };

// sendMessage //  {
//   userId: number;
//   roomId: string;
//   nickname: string;
//   message: string;
// };

// sendImage //  {
//   userId: number;
//   roomId: string;
//   nickname: string;
//   message: string;
// };

// exitChatRoom // {
//   roomId: string;
//   userId: number;
//   nickname: string;
//   userType: UserType;
// };
