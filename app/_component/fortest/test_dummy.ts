import { IChatRoom } from "../Chat_env";

export interface IUser {
  userId: number;
  email: string;
  username: string;
}

export interface IChat {
  index: number;
  roomId: number;
  message: string;
  time: string;
  senderId: number;
}

export const TestChatRoom: IChatRoom[] = [
  {
    fromId: 1,
    toId: 0,
    lastUpdate: "2023-11-20",
    chatRoomId: 0,
  },
  {
    fromId: 2,
    toId: 0,
    lastUpdate: "2023-11-21",
    chatRoomId: 1,
  },
  {
    fromId: 3,
    toId: 0,
    lastUpdate: "2023-11-22",
    chatRoomId: 2,
  },
  {
    fromId: 1,
    toId: 4,
    lastUpdate: "2023-11-21",
    chatRoomId: 3,
  },
  {
    fromId: 2,
    toId: 4,
    lastUpdate: "2023-11-22",
    chatRoomId: 4,
  },
];

export const TestUser: IUser[] = [
  {
    userId: 0,
    email: "fuzen2478@ajou.ac.kr",
    username: "장우성",
  },
  {
    userId: 1,
    email: "cuzz@ajou.ac.kr",
    username: "손진혁",
  },
  {
    userId: 2,
    email: "chamax@ajou.ac.kr",
    username: "차재명",
  },
  {
    userId: 3,
    email: "kyj@ajou.ac.kr",
    username: "김영진",
  },
  {
    userId: 4,
    email: "jyp0428@ajou.ac.kr",
    username: "박진영",
  },
];

export const TestChat: IChat[] = [
  {
    index: 0,
    roomId: 0,
    message: "안녕하세요",
    time: "2023-11-20",
    senderId: 1,
  },
];
