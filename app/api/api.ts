import axios from "axios";
import { ZodError, z } from "zod";

const main_api = axios.create({
  baseURL: "http://49.162.4.3:8080/api",
});

const chat_api = axios.create({
  baseURL: "http://49.162.4.3:4000/api",
});

//need to add type

export interface IUser {
  id: number;
  username: string;
  userId: string;
  password: string;
  roleType: "USER" | "ADMIN";
}

export interface IREQUESTEDEstate {
  userId: string;
  roomType:
    | "STUDIO"
    | "TWO-THREEROOM"
    | "OFFICETEL"
    | "ONE-ROOM"
    | "EFFICIENCY";
  rentalType: "MONTHLY" | "JEONSE";
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  squareFeet: number;
  floor:
    | "FIRST"
    | "SECOND"
    | "THIRD"
    | "FOURTH"
    | "FIFTH"
    | "SIXTH"
    | "SEVENTHUPPER"
    | "TOP"
    | "UNDER";
  option: {
    elevator: boolean;
    park: boolean;
    cctv: boolean;
    doorLock: boolean;
    pet: boolean;
    veranda: boolean;
    range: "INDUCTION" | "GAS" | "FALSE";
    airConditioner: "TOP" | "WALL" | "STAND" | "FALSE";
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
  contents: string;
  //this is for requesting estate
  contractURL?: string;
}

export interface IACCEPTEDEstate {
  userId: string;
  roomType:
    | "STUDIO"
    | "TWO-THREEROOM"
    | "OFFICETEL"
    | "ONE-ROOM"
    | "EFFICIENCY";
  rentalType: "MONTHLY" | "JEONSE";
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  squareFeet: number;
  floor:
    | "FIRST"
    | "SECOND"
    | "THIRD"
    | "FOURTH"
    | "FIFTH"
    | "SIXTH"
    | "SEVENTHUPPER"
    | "TOP"
    | "UNDER";
  option: {
    elevator: boolean;
    park: boolean;
    cctv: boolean;
    doorLock: boolean;
    pet: boolean;
    veranda: boolean;
    range: "INDUCTION" | "GAS" | "FALSE";
    airConditioner: "TOP" | "WALL" | "STAND" | "FALSE";
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
  contents: string;
  //this is for accepted estate
  id: number;
  area: "GWANGGYO" | "INGYEDONG" | "UMAN" | "WONCHEON" | "MAETAN";
  location: string;
}

export const request_apis = {
  post_form: () => main_api.post("/requested/auth/form"),
  patch_form: () => main_api.patch("/requested/auth/form"),
  post_file: () => main_api.post("/requested/auth/file"),
  patch_file: () => main_api.patch("/requested/auth/file"),
  get: () => main_api.get("/requested/auth", { withCredentials: true }),
  delete: (userId: number) => main_api.delete(`/requested/auth${userId}`),
}; //maybe for admin?

export const account_apis = {
  get: (userdata: IUser) => {
    const response = main_api
      .get("/jwt/auth", { params: userdata, withCredentials: true })
      .then((res) => res.data);
    return response;
  },
  get_token: (userdata: IUser) => {
    const response = main_api
      .get("/jwt/auth/token", { params: userdata, withCredentials: true })
      .then((res) => res.data);
    return response;
  },
  logout: (input: any) => {
    const response = main_api
      .get("/jwt/auth/logout", { headers: input, withCredentials: true })
      .then((res) => res.data);
    return response;
  },
  signup: (input: any) => {
    const response = main_api
      .post("/jwt/no-auth/sign-up", input)
      .then((res) => res.data);
    return response;
  },
  login: (input: any) => {
    const response = main_api
      .post("/jwt/no-auth/login", input)
      .then((res) => res.data);
    return response;
  },
  mail_send: (input: string) => {
    const response = main_api
      .post("/email/no-auth/mail-send", input)
      .then((res) => {
        return res.data;
      });
    return response;
  },
  get_member: (input: any) => {
    const response = main_api
      .get(`/member/auth/${input?.userId}`, { withCredentials: true })
      .then((res) => res.data);
    return response;
  },
};

export const estate_apis = {
  get_map: (filter?: any) => {
    const response = main_api
      .get("/estate/no-auth/map", { params: filter, withCredentials: true })
      .then((res) => res.data);
    return response;
  },
  get_board: (filter?: any) => {
    const response = main_api
      .get("/estate/no-auth/board", { params: filter, withCredentials: true })
      .then((res) => res.data);
    return response;
  },
  get: (estateId: number) => {
    const response = main_api
      .get(`/estate/no-auth/${estateId}`, { withCredentials: true })
      .then((res) => res.data);
    return response;
  },
  post: (input: any) => {
    const response = main_api
      .post("/estate/auth", input)
      .then((res) => res.data);
    return response;
  },
  patch: (estateId: number) => {
    const response = main_api
      .patch(`/estate/auth/${estateId}`)
      .then((res) => res.data);
    return response;
  },
};

export const chat_apis = {
  createRoom: (input: any) => {
    const response = chat_api.post("/chatroom", input).then((res) => res.data);
    return response;
  },
  getRoom: () => {
    const response = chat_api
      .get("/me/chatrooms", { withCredentials: true })
      .then((res) => res.data);
    return response;
  },
  uploadImage: (image: { file: string; type: string }) => {
    const response = chat_api
      .post("/upload", image, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
    return response;
  },
};
