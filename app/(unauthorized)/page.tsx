"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { newAccessToken } from "../component/auth/LoginForm";
import { SendImage, sendMessage, useChatSocket } from "../(authorized)/chat/Socket";
import { chat_apis } from "../api/api";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Search from "../component/board/Search";
import Filter, { FilterProvider, useFilter } from "../component/Filter";

const socket = io("http://49.162.4.3:4000");

// function logOut() {
//   return axios
//     .get("http://49.162.4.3:8080/api/jwt/auth/logout", {
//       headers: {
//         "x-access-token": `${newAccessToken}`,
//       },
//     })
//     .then((response) => {
//       console.log(response.headers);

//       console.log("로그아웃 되었습니다.");
//       // router.push('/');
//       // 로그아웃 성공 처리
//     })
//     .catch((error) => {
//       alert("로그아웃에 실패했습니다.");
//       console.error(error);
//       // 로그아웃 실패 처리
//     });
// }

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

  const onChangeImage = (e: any) => {
    SendImage("6561ad0a36440fbdec157bb9", 1, "bullshit", e.target.files[0]);
    chat_apis.uploadImage(e.target.files[0]);
  };

  const { filterOption, setFilterOption, showFilter, setShowFilter } = useFilter();

  // useEffect(() => {
  //   console.log("image: ", image);
  // }, [image]);
  return (
    <div className="main-content max-h-[calc(100vh-5rem)] max-w-[100vw]">
      <Map center={{ lat: 37.2782, lng: 127.042085 }} style={{ width: "100%", height: "calc(100vh - 4rem)" }}>
        <MapMarker position={{ lat: 37.2782, lng: 127.042085 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
      <Search data={{ data: [] }} className="absolute top-20 z-50 -right-3" />
      <div
        className="absolute top-20 left-4 z-50 rounded-lg bg-black text-white w-fit py-1 px-2"
        onClick={() => sendMessage("6564384908a74320c964fbab", 5, "fuzen", "메세지 잘 가나요?")}
      >
        메세지 보내기
      </div>
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
