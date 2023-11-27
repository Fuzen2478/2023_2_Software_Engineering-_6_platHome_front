"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { newAccessToken } from "../component/auth/LoginForm";
import { useChatSocket } from "../component/chat/Socket";
import { chat_apis } from "../api/api";

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

// console.log(socket);

async function CreateRoom() {
  console.log("Entering chat room");
  socket.emit("enterChatRoom", {
    roomId: "6561ad0a36440fbdec157bb9",
  });
}

async function Connect() {
  console.log("Connecting");
  await socket.on("connect", () => {
    console.log("connect");
  });
}

async function SendMessage() {
  console.log("Sending message");
  socket.emit("sendImage", {
    userId: 1,
    roomId: "6561ad0a36440fbdec157bb9",
    nickname: "bullshit_Next",
    message:
      "https://plathomebucket.s3.ap-northeast-2.amazonaws.com/chat/Sat%20Nov%2025%202023%2017%3A20%3A53%20GMT%2B0900%20%28%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%ED%91%9C%EC%A4%80%EC%8B%9C%29_images.jpeg",
  });
}

export default function Home() {
  const router = useRouter();

  const [image, setImage] = useState(null);

  const onChangeImage = (e) => {
    chat_apis.uploadImage(e.target.files[0]);
  };

  // useEffect(() => {
  //   console.log("image: ", image);
  // }, [image]);

  return (
    <div className="main-content">
      메인콘텐츠
      <div
        className="button h-32 w-32 bg-red-400 flex justify-center items-center"
        onClick={() => Connect()}
      >
        연결버튼
      </div>
      <div
        className="button h-32 w-32 bg-blue-400 flex justify-center items-center"
        onClick={() => CreateRoom()}
      >
        입장버튼
      </div>
      <div
        className="button h-32 w-32 bg-white flex justify-center items-center"
        onClick={() => SendMessage()}
      >
        전송버튼
      </div>
      <input
        type="file"
        accept={"image/jpeg" || "image/HEIC" || "image/jpg"}
        onChange={(e) => onChangeImage(e)}
      />
      <div className="log-out-btn">
        <button
          className="log-out"
          onClick={() => {
            console.log("Token: ", newAccessToken);
            // logOut();
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
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
