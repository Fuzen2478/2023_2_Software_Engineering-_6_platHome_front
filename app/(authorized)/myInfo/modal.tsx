"use client";

import { account_apis, wishlist_apis } from "@/app/api/api";
import { useMyInfo } from "@/app/hook";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function MyInfoModal() {
  const { showMyInfoModal, setShowMyInfoModal } = useMyInfo();
  const [myData, setMyData] = useState<any>(null);
  const [myWishList, setMyWishList] = useState<any>(null);

  useEffect(() => {
    const fetchMy = async () => {
      const res = await account_apis.auth(true);
      setMyData(res);
    };

    const fetchWishList = async () => {
      const res = await wishlist_apis.get_wishlist();
      setMyWishList(res);
    };

    fetchMy();
    fetchWishList();
  }, []);

  useEffect(() => {
    console.log("my", myData?.nickname);
  }, [myData]);

  useEffect(() => {
    console.log("myWishList", myWishList);
  }, [myWishList]);

  return (
    <Modal isOpen={showMyInfoModal} onOpenChange={setShowMyInfoModal}>
      <ModalContent>
        <ModalBody className="py-16">
          <div className="container flex flex-col items-center justify-center bg-white text-black">
            <p className="pb-8 text-center font-inter text-4xl font-normal">
              내 정보
            </p>
            <p>닉네임 : {myData?.nickname}</p>
            <p>이메일 : {myData?.email}</p>
            <div className="">
              <div>내 위시리스트</div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
