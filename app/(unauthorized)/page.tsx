'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { newAccessToken } from '../component/auth/LoginForm';

const socket = io('http://49.162.4.3:4000');

function receiveMessage() {
  socket.on('message', (data) => {
    console.log(data);
  });
}

function CreateRoom() {
  console.log('Entering chat room');
  socket.emit('enterChatRoom', {
    roomId: '0',
  });
}

function logOut() {
  return axios
    .get('http://49.162.4.3:8080/api/jwt/auth/logout', {
      headers: {
        'x-access-token': `${newAccessToken}`,
      },
    })
    .then((response) => {
      console.log(response.headers);

      console.log('로그아웃 되었습니다.');
      // router.push('/');
      // 로그아웃 성공 처리
    })
    .catch((error) => {
      alert('로그아웃에 실패했습니다.');
      console.error(error);
      // 로그아웃 실패 처리
    });
}

// console.log(socket);

export default function Home() {
  useEffect(() => {
    console.log('Component mounted');

    CreateRoom();
    console.log('Socket:', socket);

    const intervalId = setInterval(() => receiveMessage(), 1000);

    return () => {
      console.log('Component unmounted');
      clearInterval(intervalId);
    };
  }, []);
  const router = useRouter();

  return (
    <>
      <div className='main-content'>메인콘텐츠</div>
      <div className='log-out-btn'>
        <button
          className='log-out'
          onClick={() => {
            console.log('Token: ', newAccessToken);
            logOut();
          }}
        >
          로그아웃
        </button>
      </div>
    </>
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
