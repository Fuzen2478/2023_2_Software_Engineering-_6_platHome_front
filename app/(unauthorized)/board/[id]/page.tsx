"use client";

import { account_apis, chat_apis, estate_apis } from "@/app/api/api";
import { IEstateStringConvert } from "@/app/component/interface";
import { MessageCircleIcon, Star } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const id = usePathname().split("/")[2];
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetch = async () => {
      if (id !== undefined) {
        const res = await estate_apis.get(Number(id));
        setData(res);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log(data);
    console.log("memberId : ", data?.memberId);
  }, [data]);

  return (
    <>
      <div className="flex flex-col max-h-[calc(100vh-4rem)]">
        <div className="w-full h-screen flex flex-col gap-y-4 px-8 pb-4 bg-sky-200 font-semibold ">
          <div className="w-full px-8 my-2 flex justify-start items-center gap-4 justify-items-start">
            <p className="rounded-xl grow bg-primary-300 py-2 px-4 text-center text-white font-bold">
              {data?.location}
            </p>
            <div className="h-max w-52 bg-white flex items-center gap-5 px-3 py-2 rounded-xl">
              <div className="rounded-md overflow-hidden border border-black w-6 h-6">
                <div className="bg-slate-300 h-1/3"></div>
                <div className="bg-white h-2/3"></div>
              </div>
              양도 매물 게시글
            </div>
          </div>
          {data?.memberId !== undefined && (
            <div className="px-8 py-4 border-4 bg-white border-black grow rounded-3xl flex gap-x-16 w-full">
              <div className="flex flex-col gap-y-4 basis-1/2 border">
                <img className="w-full rounded-2xl" src={data?.thumbNailUrl} alt="houseImage" />
                <div className="flex gap-x-4">
                  <Star size={32} />
                  <MessageCircleIcon
                    size={32}
                    onClick={async () => {
                      const oppo: object = await account_apis.get_member(data.memberId).then((res) => res);
                      const my: object = await account_apis.auth(true).then((res) => res);
                      chat_apis.createRoom({
                        name: data.location,
                        seller_id: data.memberId,
                        seller_nickname: oppo.nickname,
                        buyer_nickname: my.nickname,
                        estate_id: data.estateId,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-4 grow">
                <div className="border-2 border-primary-300 rounded-2xl p-4 h-[20rem] overflow-y-scroll scrollbar-hide">
                  {data?.context}
                </div>
                <div className="flex gap-x-4">
                  <div className="border-2 border-primary-300 rounded-2xl px-4 basis-1/2 h-[20rem] text-xl flex flex-col justify-center">
                    <p>{"집 유형 : " + data?.roomType}</p>
                    <p>{"계약 유형 : " + data?.rentalType}</p>
                    <p>{"층 수 : " + data?.floor}</p>
                    <p>{"만료 계약 기간 : " + data?.contractTerm}</p>
                    <p>{"보증금 : " + data?.deposit.toLocaleString()}</p>
                    <p>{"월세 : " + data?.monthlyRent.toLocaleString()}</p>
                    <p>{"관리비 : " + data?.maintenanceFee.toLocaleString()}</p>
                    <p>{"평수 : 약 " + data?.squareFeet + " 평"}</p>
                  </div>
                  <div className="border-2 border-primary-300 rounded-2xl p-4 grow h-[20rem] flex flex-wrap overflow-y-scroll scrollbar-hide gap-x-3 gap-y-2 items-start content-start">
                    <div className="bg-primary rounded-2xl text-white px-4 py-2 max-h-8 w-fit flex justify-center items-center">
                      {data?.area}
                    </div>
                    {data !== undefined ? (
                      Object.entries(data.option).map(([key, value]: [string, any]) => {
                        if (value !== false && value !== "false") {
                          return (
                            <div
                              key={`${id}-${key}`}
                              className="bg-primary rounded-2xl text-white px-4 py-2 max-h-8 w-fit flex justify-center items-center"
                            >
                              {IEstateStringConvert.hasOwnProperty(key.toUpperCase() as string)
                                ? IEstateStringConvert[key.toUpperCase() as keyof typeof IEstateStringConvert]
                                : IEstateStringConvert[
                                    (key.toUpperCase() +
                                      "." +
                                      String(value).toUpperCase()) as keyof typeof IEstateStringConvert
                                  ]}
                            </div>
                          );
                        } else {
                          return <></>;
                        }
                      })
                    ) : (
                      <>Not Found</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
