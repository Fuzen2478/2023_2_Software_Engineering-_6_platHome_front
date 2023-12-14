"use client";

import { account_apis, estate_apis, wishlist_apis } from "@/app/api/api";
import { useFilter } from "@/app/component/Filter";
import { IEstateStringConvert } from "@/app/component/interface";
import { useMyInfo, useRequestEstate } from "@/app/hook";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Tooltip } from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { setRequestMeta } from "next/dist/server/request-meta";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyInfoModal() {
  const { showMyInfoModal, setShowMyInfoModal } = useMyInfo();
  const [myData, setMyData] = useState<any>(null);
  const [myWishList, setMyWishList] = useState<any>(null);
  const [myEstate, setMyEstate] = useState<any>(null);
  const router = useRouter();
  const { showRequestEstateModal, setShowRequestEstateModal } = useRequestEstate();

  useEffect(() => {
    const fetchMy = async () => {
      const res = await account_apis.auth(true);
      setMyData(res);
    };

    const fetchWishList = async () => {
      const res = await wishlist_apis.get_wishlist();
      setMyWishList(res);
    };

    const findMyEstate = async () => {
      const res = await estate_apis.getAllMap();
      console.log("first res : ", res);
      const result = res.filter(async (item: any) => {
        const ress = await estate_apis.get(item.estateId);
        console.log("second res : ", ress);
        console.log("myData : ", myData);
        if (myData !== null && ress !== undefined) {
          if (Number(ress.memberId) === Number(myData.id)) return true;
        }
      });
      console.log(result);
      setMyEstate(result);
    };

    fetchMy();
    fetchWishList();
    findMyEstate();
  }, []);

  return (
    <Modal
      isOpen={showMyInfoModal}
      onOpenChange={setShowMyInfoModal}
      className=" bg-neutral-800 border-4 border-primary-300"
    >
      <ModalContent>
        <ModalBody className="py-16">
          <div className="container flex flex-col gap-y-6 justify-center text-primary-400 font-bold">
            <p className="pb-8 text-center font-inter text-4xl font-normal">내 정보</p>
            <p>닉네임 : {myData?.nickname}</p>
            <p>이메일 : {myData?.email}</p>
            <Button
              color="danger"
              onClick={() => {
                localStorage.removeItem("access-key");
                localStorage.removeItem("refresh-key");
                window.location.reload();
              }}
            >
              로그아웃
            </Button>
            <hr />

            <div className="flex gap-x-4">
              <p>내가 등록한 매물</p>
              <Tooltip content="매물 등록요청하기">
                <PlusCircle
                  size={24}
                  className="cursor-pointer"
                  onClick={() => {
                    setShowRequestEstateModal(true);
                    setShowMyInfoModal(false);
                  }}
                />
              </Tooltip>
            </div>
            {/* {myEstate !== null && myEstate !== undefined && (
              <>
                <div className="myEstate">
                  <div className="w-[22rem]" key={myEstate.memberId}>
                    <article className="mx-auto w-[22rem] p-4 flex items-start gap-4 border-2 border-black rounded-xl bg-white font-semibold">
                      <img
                        className="rounded-lg cursor-pointer"
                        src={myEstate?.thumbNailUrl ?? ""}
                        alt="thumbnail"
                        width={150}
                        height={150}
                        onClick={() => {
                          router.push(`/board/${myEstate.estateId}`);
                        }}
                      />
                      <section className="flex-grow">
                        <div className="flex justify-center gap-8 flex-grow">
                          <div className="text-white text-xl rounded-full px-4 py-1.5 bg-orange-400">
                            {myEstate?.roomType}
                          </div>
                          <div className="text-white text-xl rounded-full px-4 py-1.5 bg-violet-500">
                            {IEstateStringConvert[myEstate.rentalType as keyof typeof IEstateStringConvert]}
                          </div>
                        </div>
                        <section
                          className="text-gray-500 mt-2 cursor-pointer"
                          onClick={() => router.push(`/board/${myEstate.estateId}`)}
                        >
                          <p>
                            {myEstate.deposit} / {myEstate.monthly} (관리비 {myEstate.managementFee}만)
                          </p>
                          <p>
                            {myEstate.floor}층 {myEstate.area}m<sup>2</sup>
                          </p>
                          <p className="break-words w-60 h-16 overflow-hidden text-clip whitespace-normal truncate">
                            {myEstate.description}
                          </p>
                        </section>
                      </section>
                    </article>
                  </div>
                </div>
                <hr />
              </>
            )} */}
            <div className="wishlist">
              <div>내 위시리스트</div>
              <div className="flex flex-wrap gap-4">
                {myWishList?.map((item: any) => {
                  return (
                    <div className="w-[25rem]" key={item.memberId}>
                      <article className="mx-auto w-full p-4 flex items-start gap-4 border-2 border-black rounded-xl bg-white font-semibold">
                        <img
                          className="rounded-lg cursor-pointer h-full"
                          src={item?.thumbNailUrl ?? ""}
                          alt="thumbnail"
                          width={150}
                          height={150}
                          onClick={() => {
                            router.push(`/board/${item.estateId}`);
                          }}
                        />
                        <section className="grow w-full">
                          <div className="flex gap-4">
                            <div className="text-white text-xl rounded-full px-4 py-1.5 bg-orange-400">
                              {IEstateStringConvert[item?.roomType as keyof typeof IEstateStringConvert]}
                            </div>
                            <div className="text-white text-xl rounded-full px-4 py-1.5 bg-violet-500">
                              {IEstateStringConvert[item.rentalType as keyof typeof IEstateStringConvert]}
                            </div>
                          </div>
                          <section
                            className="text-gray-500 mt-2 cursor-pointer flex flex-col justify-center"
                            onClick={() => router.push(`/board/${item.estateId}`)}
                          >
                            <p>
                              {item.deposit.toLocaleString()} / {item.monthlyRent.toLocaleString()}
                            </p>{" "}
                            <p>(관리비 {item.maintenanceFee / 10000}만)</p>
                            <p>
                              {IEstateStringConvert[item.floor as keyof typeof IEstateStringConvert]} {item.squareFeet}m
                              <sup>2</sup>
                            </p>
                            <p className="break-words w-60 h-16 overflow-hidden text-clip whitespace-normal truncate">
                              {item.description}
                            </p>
                          </section>
                        </section>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
