import axios from "axios";
import { ZodError, z } from "zod";
import { IFilter } from "../component/Filter/const";

export const serverIp = process.env.SERVER_URL || "";
export const mainPort = process.env.MAIN_PORT || "";
export const chatPort = process.env.CHAT_PORT || "";

const main_api = axios.create({
  baseURL: serverIp + mainPort + "/api",
  withCredentials: true,
});

const chat_api = axios.create({
  baseURL: serverIp + chatPort + "/api",
  withCredentials: true,
});

export const request_apis = {
  post_form: () => main_api.post("/requested/auth/form"),
  patch_form: () => main_api.patch("/requested/auth/form"),
  post_file: () => main_api.post("/requested/auth/file"),
  patch_file: () => main_api.patch("/requested/auth/file"),
  get: () => main_api.get("/requested/auth", { withCredentials: true }),
  delete: (userId: number) => main_api.delete(`/requested/auth${userId}`),
}; //maybe for admin?

export const account_apis = {
  auth: (needData?: boolean) => {
    const refresh = localStorage.getItem("refresh-key");
    const access = localStorage.getItem("access-key");
    const response = main_api
      .get("/jwt/auth", {
        headers: {
          "x-access-token": access,
          "x-refresh-token": refresh,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (needData) return res.data;
        return true;
      })
      .catch(async (err) => {
        console.log("auth : ", err);
        if (err.errorCode === 401) {
          await account_apis.get_token();
          needData ? account_apis.auth(needData) : account_apis.auth();
        }
        return false;
      });
    return response;
  },
  get_token: async () => {
    const refresh = localStorage.getItem("refresh-key");
    const access = localStorage.getItem("access-key");
    const response = await main_api
      .get("/jwt/auth/token", {
        headers: {
          "x-access-token": access,
          "x-refresh-token": refresh,
        },
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("access-key", res.data.accessToken);
        localStorage.setItem("refresh-key", res.data.refreshToken);
        return res.status;
      })
      .catch((err) => {
        console.log("get_token : ", err);
        return err.response.status;
      });
    return response;
  },
  logout: () => {
    const access = localStorage.getItem("access-key");
    const response = main_api
      .get("/jwt/auth/logout", {
        headers: {
          "x-access-token": access,
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          account_apis.logout();
        }
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
  get_member: (input: number) => {
    const response = main_api
      .get(`/member/no-auth/${input}`, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        return err.statusCode;
      });
    return response;
  },
};

export const estate_apis = {
  get_map: (filter: IFilter) => {
    const response = main_api
      .post("/estate/no-auth/map/filter", filter, { withCredentials: true })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        return err.statusCode;
      });
    return response;
  },
  get_board: (filter: IFilter) => {
    const response = main_api
      .post("/estate/no-auth/board/filter", filter, { withCredentials: true })
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
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          estate_apis.post(input);
          return 200;
        }
        return err.statusCode;
      });
    return response;
  },
  patch: (estateId: number) => {
    const response = main_api
      .patch(`/estate/auth/${estateId}`, { withCredentials: true })
      .then((res) => res.data)
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          estate_apis.patch(estateId);
          return 200;
        }
        return err.statusCode;
      });
    return response;
  },
};

export const wishlist_apis = {
  get_wishlist: () => {
    const access = localStorage.getItem("access-key");
    const response = main_api
      .get("/wish-list/auth", {
        headers: {
          "x-access-token": access,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          wishlist_apis.get_wishlist();
          return 200;
        }
        return err.statusCode;
      });
    return response;
  },
  add_wishlist: (input: number) => {
    const access = localStorage.getItem("access-key");
    const response = main_api
      .post(
        "/wish-list/auth/estate/" + input,
        { estateId: input },
        {
          headers: {
            "x-access-token": access,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        wishlist_apis.get_wishlist();
        return res.data;
      })
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          wishlist_apis.add_wishlist(input);
          return 200;
        }
        return err.statusCode;
      });
    return response;
  },
  remove_wishlist: (input: number) => {
    const access = localStorage.getItem("access-key");
    const response = main_api
      .delete("/wish-list/auth/" + input, {
        headers: {
          "x-access-token": access,
        },
        withCredentials: true,
      })
      .then((res) => {
        wishlist_apis.get_wishlist();
        return res.data;
      })
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          wishlist_apis.remove_wishlist(input);
          return 200;
        }
        return err.statusCode;
      });
    return response;
  },
};

export const chat_apis = {
  createRoom: (input: ICreateChatRoom) => {
    const access = localStorage.getItem("access-key");
    const response = chat_api
      .post("/chatroom", input, {
        headers: {
          "x-access-token": access,
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch(async (err) => {
        if (err.response?.status === 401) {
          await account_apis.get_token();
          chat_apis.createRoom(input);
        }
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
      .then((res) => {
        const roomArray = res.data.map((item: any) => {
          return item._doc;
        });
        return roomArray;
      })
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          chat_apis.getRoom();
        }
        return err.statusCode;
      });
    return response;
  },
  uploadImage: (image: { file: string; type: string }) => {
    const access = localStorage.getItem("access-key");
    const response = chat_api
      .post("/upload", image, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": access,
        },
      })
      .then((res) => res.data)
      .catch(async (err) => {
        if (err.errorCode === 401) {
          await account_apis.get_token();
          chat_apis.uploadImage(image);
          return 200;
        }
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

interface ICreateChatRoom {
  name: string;
  seller_id: number;
  seller_nickname: string;
  buyer_nickname: string;
  estate_id: number;
}

// {
//   "memberId": 0,
//   "location": "아주로 37번길 10-3",
//   "rentalType": "MONTHLY",
//   "thumbNailUrl": null
// }
