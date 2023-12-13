"use client";
// SignUp.tsx

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

function SignUp() {
  const [id, setId] = useState("");
  const [num, setVerifyNum] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCheck, setPwck] = useState("");
  const [isEqual, setIsEqual] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const { showSignUp, setShowSignUp } = useShowSignUp();

  function postSignUpData() {
    console.log(id, num, password, username);
    return axios
      .post("http://49.162.4.3:8080/api/jwt/no-auth/sign-up", {
        authCode: num,
        nickname: username,
        email: username,
        password,
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        //window.location.href = '/login';
        router.replace("/SignUp");
        // 회원가입 성공 처리
      })
      .catch((error) => {
        alert("가입에 실패했습니다. 입력한 내용을 다시 확인해 주세요.");
        console.error(error);
        // 회원가입 실패 처리
      });
  }

  function postEmailCert() {
    return axios
      .post(
        "http://49.162.4.3:8080/api/email/no-auth/send-email",
        {
          userId: id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return axios
          .post(
            "http://49.162.4.3:8080/api/email/no-auth/send-email",
            {
              userId: id,
            },
            { withCredentials: true }
          )
          .then((response) => {
            alert("입력하신 이메일로 인증번호가 전송되었습니다.");
            console.log(response.data);
            setId("");
            // 이메일 인증 성공 처리
          })
          .catch((error) => {
            alert("인증코드 전송에 실패하였습니다.");
            console.error(error);
            // 이메일 인증 실패 처리
          });
      })
      .catch((error) => {
        alert("이미 가입된 이메일입니다.");
        console.error(error);
        console.log("123");
        // 이메일 인증 실패 처리
      });
  }

  const SignFunc = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const validatePassword = (password: any) => {
    console.log("test : ", password);
    if (password.length <= 8) {
      setIsValid(false);
    } else if (!/[a-zA-Z]/.test(password)) {
      setIsValid(false);
    } else if (!/\d/.test(password)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const passwordChange = (event: any) => {
    const pwvalue = event.target.value;
    setPassword(pwvalue);

    console.log("password : ", pwvalue);
    validatePassword(pwvalue);
  };

  const checkPassword = (passwordCheck: any) => {
    console.log("check : ", passwordCheck);
    console.log("check2 : ", password);
    if (passwordCheck.length == 0) {
      console.log("false");
      setIsEqual(false);
    } else if (password != passwordCheck) {
      setIsEqual(false);
    } else {
      setIsEqual(true);
    }
  };

  return (
    <Modal isOpen={showSignUp} onOpenChange={setShowSignUp} size="xl">
      <ModalContent className="relative flex justify-center items-center">
        <ModalBody className=" flex flex-col items-center bg-white w-full h-full">
          <div className="pt-10 w-full overflow-y-scroll scrollbar-hide">
            <p className="pb-10 text-center text-[2rem] font-bold text-blue-900">회원가입</p>
            <div className="flex flex-col items-center">
              <div className="mb-10">
                <form onSubmit={SignFunc}>
                  <div className="form-control flex flex-col items-centers w-full">
                    <label className="label pb-3">
                      <span className="label-text text-black">* 이메일</span>
                    </label>
                    <label className="input-group flex">
                      <input
                        type="text"
                        placeholder="@ajou.ac.kr"
                        className="input input-bordered flex-1 text-blackinput input-bordered grow h-[3rem] text-black border rounded-xl border-black px-[10px]"
                        value={id}
                        onChange={(event) => setId(event.target.value)}
                      />
                      <span className="px-[5px]">
                        <button
                          className="btn bg-[#DFD8D8] w-[3rem] h-[3rem] rounded-xl border border-black text-black"
                          onClick={postEmailCert}
                        >
                          인증
                        </button>
                      </span>
                    </label>

                    <label className="label">
                      <span className="label-text text-xs text-gray-400">
                        아주대학교 포탈에서 사용 중인 이메일을 정확하게 입력해 주세요.
                        <br />
                        해당 이메일로 가입 인증 메일이 발송됩니다.
                      </span>
                    </label>

                    <label className="label pt-[10px] pb-3">
                      <span className="label-text text-black">* 인증번호</span>
                    </label>
                    <input
                      type="text"
                      placeholder="인증번호"
                      className="input input-bordered w-full h-[3rem] text-black border rounded-xl border-black px-4"
                      value={num}
                      onChange={(event) => setVerifyNum(event.target.value)}
                    />

                    <label className="label">
                      <span className="label-text text-xs text-gray-400">
                        입력한 이메일로 전송된 인증번호를 정확하게 입력해주세요.
                      </span>
                    </label>
                  </div>

                  <div className="mb-6 pt-[10px]">
                    <div className="box-border pb-3 text-black">
                      <label htmlFor="email">* 유저네임</label>
                    </div>
                    <div className="auto container box-border">
                      <div className="container relative rounded-sm ">
                        <input
                          type="text"
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          className="input input-bordered w-full h-[3rem] text-black border rounded-xl border-black px-[10px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="box-border pb-3 text-black">
                      <label htmlFor="email">* 비밀번호</label>
                    </div>
                    <div className="auto container box-border">
                      <div className="container relative rounded-sm">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={passwordChange}
                          className="input input-bordered w-full h-[3rem] text-black border rounded-xl border-black px-[10px]"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2 flex items-center">
                      {!isValid ? (
                        <span className="text-xs text-gray-400">
                          8자 이상의 영문 숫자 혼합의 비밀번호를 설정해 주세요.
                        </span>
                      ) : (
                        <span className="text-xs text-green-400">올바른 형식의 비밀번호입니다!</span>
                      )}
                    </div>
                    <div className="pt-[10px]">
                      <label>
                        <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                        <span className="text-[15px] text-black pl-[5px]">비밀번호 보기</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="box-border pb-3 text-black">
                      <label htmlFor="email">* 비밀번호 확인</label>
                    </div>
                    <div className="auto container box-border">
                      <div className="container relative rounded-sm">
                        <input
                          type="password"
                          onChange={(event) => checkPassword(event.target.value)}
                          className="input input-bordered w-full h-[3rem] text-black border rounded-xl border-black px-[10px]"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2 flex items-center">
                      {!isEqual ? (
                        <span className="text-xs text-gray-400">비밀번호를 한 번 더 입력해 주세요.</span>
                      ) : (
                        <span className="text-xs text-green-400">비밀번호와 일치합니다!</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-5 align-top">
                    <button
                      type="submit"
                      onClick={postSignUpData}
                      className="btn btn-primary w-full h-[4rem] bg-[#DFD8D8] rounded-full border border-black text-black"
                    >
                      가입
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignUp;

interface SignUpContextType {
  showSignUp: boolean;
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const showSignUpContext = createContext<SignUpContextType | null>(null);

export function useShowSignUp() {
  const context = useContext(showSignUpContext);
  if (!context) {
    throw new Error("useShowSignUp must be used within a ShowSignUpProvider");
  }
  return context;
}

export function ShowSignUpProvider({ children }: { children: React.ReactNode }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return <showSignUpContext.Provider value={{ showSignUp, setShowSignUp }}>{children}</showSignUpContext.Provider>;
}
