'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function FindPw() {
  const [idForFind, setIdForFind] = useState('');

  function findPassword() {
    console.log(idForFind);
    return axios
      .post(
        'http://49.162.4.3:8080/members/password/find',
        {
          email: idForFind,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        alert('비밀번호 찾기에 실패했습니다. 이메일을 확인해 주세요.');
        console.error(error);
      });
  }

  const SubmitForm = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className='relative flex justify-center items-center py-[20px]'>
        <div className='container flex flex-col items-center justify-center w-[800px] h-[600px] bg-white border-2 border-black'>
          <div className='my-36 w-auto px-5'>
            <p className='pb-10 text-center text-2xl font-bold text-blue-600'>
              비밀번호 찾기
            </p>
            <div className='mb-10'>
              <form onSubmit={SubmitForm}>
                <div className='mb-8'>
                  <div className='box-border pb-3 text-black'>
                    <label htmlFor='email'>* 이메일</label>
                  </div>
                  <div className='auto container box-border'>
                    <div className='container relative rounded-sm'>
                      <input
                        type='text'
                        onChange={(event) => setIdForFind(event.target.value)}
                        className='input input-bordered flex-1 text-blackinput input-bordered w-[503px] h-[50px] text-black border rounded-xl border-black px-[10px]'
                        placeholder='@ajou.ac.kr'
                      />
                    </div>
                  </div>
                </div>
                <div className='mb-3 align-top'>
                  <button
                    type='submit'
                    onClick={findPassword}
                    className='btn btn-primary w-[503px] h-[61px] bg-[#DFD8D8] rounded-full border border-black text-black'
                  >
                    비밀번호 찾기
                  </button>
                </div>
                <Link href='/login'>
                  <div className='mb-5 align-top'>
                    <button className='h-9 w-full rounded-sm text-xs font-bold text-blue-500 underline'>
                      로그인 페이지로 이동
                    </button>
                  </div>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
