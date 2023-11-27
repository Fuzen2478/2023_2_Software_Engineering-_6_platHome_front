'use client';

// LoginForm.tsx
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { account_apis } from '../../api/api';

export let newAccessToken: any;

function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  //const [localStorage, setLocalStorage] = useState('');
  const router = useRouter();

<<<<<<< HEAD
  // function postLoginData(e: any) {
  //   e.preventDefault();
  //   console.log(id, password);
  //   return axios
  //     .post('http://49.162.4.3:8080/api/jwt/no-auth/login', {
  //       userId: id,
  //       password,
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       alert('로그인에 성공했습니다!');
  //       let accessToken = response.data.accessToken; // 응답헤더에서 토큰 받기
  //       newAccessToken = response.data.accessToken;
  //       let refreshToken = response.data.refreshToken; // 응답헤더에서 토큰 받기
  //       console.log('refresh 토큰 :', refreshToken);
  //       console.log('access 토큰 :', accessToken);
  //       //setLocalStorage(accessToken); // 토큰 localStorage에 저장
  //       axios.defaults.headers.common['x-access-token'] = `${accessToken}`;
  //       router.push('/');
  //       // 로그인 성공 처리
  //     })
  //     .catch((error) => {
  //       alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.');
  //       console.error(error);
  //     });
  // }
  function postLoginData(e: any) {
    e.preventDefault();
    console.log(id, password);
    return account_apis
      .login({
        email: id,
        password,
=======
  function postLoginData(e: any) {
    e.preventDefault();
    console.log(id, password);
    return axios
      .post('http://49.162.4.3:8080/api/jwt/no-auth/login', {
        userId: id,
        password,
        withCredentials: true,
>>>>>>> main
      })
      .then((response) => {
        console.log(response.data);
        alert('로그인에 성공했습니다!');
        let accessToken = response.data.accessToken; // 응답헤더에서 토큰 받기
        newAccessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken; // 응답헤더에서 토큰 받기
        console.log('refresh 토큰 :', refreshToken);
        console.log('access 토큰 :', accessToken);
        //setLocalStorage(accessToken); // 토큰 localStorage에 저장
        axios.defaults.headers.common['x-access-token'] = `${accessToken}`;
        router.push('/');
        // 로그인 성공 처리
      })
      .catch((error) => {
        alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.');
        console.error(error);
      });
  }

  return (
    <div className='flex justify-center items-center py-[20px]'>
      <div className='container flex flex-col items-center justify-center w-[800px] h-[600px] bg-white border-2 border-black'>
        <p className='w-[170px] h-[46px] pb-20 text-black text-center font-inter text-[42px] font-normal'>
          Log-In
        </p>
        <form onSubmit={postLoginData} className='flex flex-col items-center'>
          <div className='form-control py-[10px]'>
            <input
              type='text'
              placeholder='Email'
              className='input input-bordered w-[503px] h-[61px] text-black border rounded-xl border-black px-[10px]'
              onChange={(event) => setId(event.target.value)}
              value={id}
            />
          </div>

          <div className='form-control'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='input input-bordered w-[503px] h-[61px] text-black border rounded-xl border-black px-[10px]'
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <div className='pt-[10px]'>
              <label>
                <input
                  type='checkbox'
                  onClick={() => setShowPassword(!showPassword)}
                />
                <span className='text-[15px] text-black pl-[5px]'>
                  비밀번호 보기
                </span>
              </label>
            </div>
          </div>

          <div className='align-top py-[10px]'>
            <button
              type='submit'
              onClick={postLoginData}
              className='btn btn-primary w-[503px] h-[61px] bg-[#DFD8D8] rounded-full border border-black text-black'
            >
              로그인
            </button>
          </div>
        </form>
        <div className='flex w-full justify-evenly'>
          <Link href='/password/find'>
            <span className='h-7 text-[15px] font-bold text-blue-500 underline'>
              비밀번호 찾기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
