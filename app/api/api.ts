import axios from "axios";
import { ZodError, z } from "zod";

const serverIp = process.env.SERVER_URL || "";
const mainPort = process.env.MAIN_PORT || "";
const chatPort = process.env.CHAT_PORT || "";

const main_api = axios.create({
  baseURL: serverIp + mainPort + "/api",
});

const chat_api = axios.create({
  baseURL: serverIp + chatPort + "/api",
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
  contractTerm: string;
  location: string;
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
  images: string[];
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
  location: string;
  images: string[];
  contractTerm: string;
  //this is for accepted estate
  id: number;
  area: "GWANGGYO" | "INGYEDONG" | "UMAN" | "WONCHEON" | "MAETAN";
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
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  get_token: (refreshToken: string) => {
    const response = main_api
      .get("/jwt/auth/token", {
        headers: { Access: refreshToken },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        res.data;
      })
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  logout: (input: any) => {
    const response = main_api
      .get("/jwt/auth/logout", { headers: input, withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  signup: (input: any) => {
    const response = main_api
      .post("/jwt/no-auth/sign-up", input, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  login: (input: any) => {
    console.log("로그인 요청", input);
    const response = main_api
      .post("/jwt/no-auth/login", {
        email: input.email,
        password: input.password,
      })
      .then((res) => {
        localStorage.setItem("access-key", res.data.accessToken);
        localStorage.setItem("refresh-key", res.data.refreshToken);
        return 200;
      })
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  mail_send: (input: string) => {
    const response = main_api
      .post("/email/no-auth/send-email", { email: input })
      .then((res) => {
        return res.data;
      });
    return response;
  },
  get_member: (input: any) => {
    const response = main_api
      .get(`/member/auth/${input?.userId}`, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
};

export const estate_apis = {
  get_map: (filter?: any) => {
    const response = main_api
      .get("/estate/no-auth/map", { params: filter, withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  get_board: (filter?: any) => {
    const response = main_api
      .get("/estate/no-auth/board", { params: filter, withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  get: (estateId: number) => {
    const response = main_api
      .get(`/estate/no-auth/${estateId}`, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  post: (input: any) => {
    const response = main_api
      .post("/estate/auth", input, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  patch: (estateId: number) => {
    const response = main_api
      .patch(`/estate/auth/${estateId}`, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
};

export const chat_apis = {
  createRoom: (input: any) => {
    const response = chat_api
      .post("/chatroom", input, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
  getRoom: () => {
    const token = localStorage.getItem("access-key");
    const response = chat_api
      .get("/me/chatrooms", {
        headers: { "x-access-token": token },
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("access-key");
          localStorage.removeItem("refresh-key");
          // window.location.reload();
          // const refreshToken = localStorage.getItem("refresh-key");
          // account_apis.get_token(refreshToken as string);
        }
        return err.statusCode;
      });
    return response;
  },
  uploadImage: (image: { file: string; type: string }) => {
    const response = chat_api
      .post("/upload", image, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
};

interface IWishList {
  estateId: number;
  thumbnail: string;
  roomType: "JEONSE" | "MONTHLY";
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  squareFeet: number;
  location: string;
}
