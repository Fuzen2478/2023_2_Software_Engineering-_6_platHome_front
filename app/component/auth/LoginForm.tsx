'use client';

// LoginForm.tsx
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export let newAccessToken: any;

function LoginForm() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  //const [localStorage, setLocalStorage] = useState('');

  const router = useRouter();
  function postLoginData() {
    console.log(id, password);
    return axios
      .post(
        'http://49.162.4.3:8080/api/jwt/no-auth/login',
        {
          userId: id,
          password,
        },
        { withCredentials: true }
      )
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

  // function adjfdf(){
  //   axios.post(,{
  //     header:{},
  //   })
  // }

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <p className='pb-10 text-center text-3xl font-bold text-blue-600'>
        PlatHome
      </p>
      <div className='w-full p-8 flex flex-col gap-4 max-w-xl mx-auto'>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>이메일</span>
          </label>
          <input
            type='text'
            placeholder='@ajou.ac.kr'
            className='input input-bordered w-full text-black'
            onChange={(event) => setId(event.target.value)}
            value={id}
          />
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>비밀번호</span>
          </label>
          <input
            type='password'
            className='input input-bordered w-full text-black'
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>

        <div className='align-top'>
          <button
            type='submit'
            onClick={postLoginData}
            className='btn btn-primary w-full'
          >
            로그인
          </button>
        </div>
        <div className='flex w-full justify-evenly'>
          <Link href='/password/find'>
            <span className='h-7 text-xs font-bold text-blue-500 underline'>
              비밀번호 찾기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
