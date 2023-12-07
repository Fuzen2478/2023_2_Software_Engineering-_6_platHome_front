import { IChatRoom } from "../../(authorized)/chat/Chat_env";

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

interface ISchedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

//일정 조율부분에서 데이터 통신은 Ischdule[] 형태로 받아옴

interface IEstateReport {
  id: number;
  estateId: number;
  reporterId?: number;
  reporterContact?: string; //email
  contents: string;
}

//매물 신고는 비로그인 상태에서도 가능하다면 reporterId 혹은 reporterContact를 기입하여 연락망을 남겨둠.

interface IUserReport {
  id: number;
  userId: number;
  reporterId: number;
  contents: string;
}

//userId에 피신고 유저의 Id, reporterId에 신고자의 Id를 기입함.

interface IFilter {
  Area: {
    gwanggyo: boolean;
    ingyedong: boolean;
    uman: boolean;
    woncheon: boolean;
    maetan: boolean;
  };
  RoomType: {
    studio: boolean;
    "two-threeRoom": boolean;
    officetel: boolean;
    apartment: boolean;
  };
  RentType: { monthly: boolean; jeonse: boolean };
  Deposit: { min: number; max: number };
  MonthlyFee: { min: number; max: number }; //월세 + 관리비
  RoomSize: { min: number; max: number };
  floor: {
    first: boolean;
    second: boolean;
    third: boolean;
    fourth: boolean;
    fifth: boolean;
    sixth: boolean;
    seventhUpper: boolean;
    top: boolean; //옥탑방
    under: boolean; //반지하
  };
  option: {
    elevator: boolean;
    park: boolean;
    cctv: boolean;
    doorLock: boolean;
    pet: boolean;
    veranda: boolean;
    range: "induction" | "gas" | false;
    airConditioner: "top" | "wall" | "stand" | false;
    refrigerator: boolean;
    sink: boolean;
    tv: boolean;
    internet: boolean;
    bed: boolean;
    desk: boolean;
    microwave: boolean;
    closet: boolean;
    shoeRack: boolean;
    bidet: boolean;
    interphone: boolean;
    parking: boolean;
    security: boolean;
    deilveryBox: boolean;
    BuildingEntrance: boolean;
    washingMachine: boolean;
  };
}
