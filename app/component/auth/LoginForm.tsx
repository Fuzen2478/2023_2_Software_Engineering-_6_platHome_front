"use client";

// LoginForm.tsx
import { createContext, useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { account_apis } from "@/app/api/api";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

// return axios
//       .post('http://49.162.4.3:8080/api/jwt/no-auth/login', {
//         userId: id,
//         password,
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log(response.data);
//         alert('로그인에 성공했습니다!');
//         let accessToken = response.data.accessToken; // 응답헤더에서 토큰 받기
//         newAccessToken = response.data.accessToken;
//         let refreshToken = response.data.refreshToken; // 응답헤더에서 토큰 받기
//         console.log('refresh 토큰 :', refreshToken);
//         console.log('access 토큰 :', accessToken);
//         //setLocalStorage(accessToken); // 토큰 localStorage에 저장
//         axios.defaults.headers.common['x-access-token'] = `${accessToken}`;
//         router.push('/');
//         // 로그인 성공 처리
//       })
//       .catch((error) => {
//         alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.');
//         console.error(error);
//       });

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { showLoginForm, setShowLoginForm } = useShowLogin();

  function postLoginData(e: any) {
    e.preventDefault();
    const res = account_apis.login({ email: id, password: password });
    setShowLoginForm(false);
  }

  return (
    <div className="flex justify-center items-center py-[20px]">
      <Modal isOpen={showLoginForm} onOpenChange={setShowLoginForm}>
        <ModalContent>
          <ModalBody className="py-16">
            <div className="container flex flex-col items-center justify-center bg-white">
              <p className="pb-8 text-black text-center font-inter text-4xl font-normal">
                Log-In
              </p>
              <form
                onSubmit={postLoginData}
                className="flex flex-col items-center"
              >
                <div className="form-control py-[10px]">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered text-black border rounded-xl border-black px-[10px]"
                    onChange={(event) => setId(event.target.value)}
                    value={id}
                  />
                </div>

                <div className="form-control">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered text-black border rounded-xl border-black px-[10px]"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />
                  <div className="pt-[10px]">
                    <label>
                      <input
                        type="checkbox"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                      <span className="text-[15px] text-black pl-[5px]">
                        비밀번호 보기
                      </span>
                    </label>
                  </div>
                </div>

                <div className="align-top py-4">
                  <button
                    type="submit"
                    onClick={postLoginData}
                    className="btn btn-primary bg-[#DFD8D8] rounded-full border border-black text-black w-48"
                  >
                    로그인
                  </button>
                </div>
              </form>
              <div className="flex w-full justify-evenly">
                <Link href="/password/find">
                  <span className="h-7 text-[15px] font-bold text-blue-500 underline">
                    비밀번호 찾기
                  </span>
                </Link>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default LoginForm;

interface LoginFormContextType {
  showLoginForm: boolean;
  setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const showLoginContext = createContext<LoginFormContextType | null>(null);

export function useShowLogin() {
  const context = useContext(showLoginContext);
  if (!context) {
    throw new Error("useShowLogin must be used within a ShowLoginProvider");
  }
  return context;
}

export function ShowLoginProvider({ children }: { children: React.ReactNode }) {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <showLoginContext.Provider value={{ showLoginForm, setShowLoginForm }}>
      {children}
    </showLoginContext.Provider>
  );
}
