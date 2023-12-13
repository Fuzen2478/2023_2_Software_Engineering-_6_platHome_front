"use client";

import { report_apis } from "@/app/api/api";
import { useEstateReport } from "@/app/hook";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function ReportEstateModal({ id, location }: { id: number; location: string }) {
  const { showEstateReportModal, setShowEstateReportModal } = useEstateReport();
  const [content, setContent] = useState("");
  return (
    <Modal
      isOpen={showEstateReportModal}
      onOpenChange={setShowEstateReportModal}
      className=" bg-white border-4 border-black rounded-2xl"
    >
      <ModalContent>
        <ModalHeader className="bg-[#FFC279] text-center text-2xl font-extrabold text-[#EBEEF9]">
          매물 신고하기
        </ModalHeader>
        <ModalBody className="py-16">
          <div className="flex flex-col gap-y-4">
            <div>신고 대상 매물</div>
            {location}
            <div>신고 사유</div>
            <Input
              type="text"
              size="lg"
              fullWidth
              placeholder="신고 사유를 입력해주세요."
              onChange={() => {
                setContent(content);
              }}
            />
            <Button
              color="warning"
              className="text-white"
              onClick={() => {
                report_apis.estateReport(id, content);
                setShowEstateReportModal(false);
              }}
            >
              전송하기
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
