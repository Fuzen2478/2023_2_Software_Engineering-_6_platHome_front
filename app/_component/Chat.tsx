import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";

function ChatDropDown({ open }: { open: boolean }) {
  return (
    <div
      className="border rounded-lg flex flex-col justify-center bg-white px-2"
      style={{ display: open ? "block" : "none" }}
    >
      <div className="flex justify-center items-center h-8 border-b">
        신고하기
      </div>
      <div className="flex justify-center items-center h-8">채팅방 삭제</div>
    </div>
  );
}

function ChatFileForm({ open }: { open: boolean }) {
  return (
    <div
      className="bg-[#E6E6E6] flex justify-center items-center h-16"
      style={{ display: open ? "block" : "none" }}
    >
      <div className="text-black border-dashed border-2 flex items-center justify-center rounded-md px-12 py-2">
        파일을 드래그해서 올리세요
      </div>
    </div>
  );
}

export default function Chat() {
  const [fileFormOpen, setFileFormOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className="flex flex-col h-80 w-[19rem] rounded-md border bg-[#E3F8FF]">
      <div>
        <div className="chat-header bg-[#FFDD83] flex items-center text-white">
          <div className="opposite-name grow text-xl flex justify-center items-center pl-4">
            USER 1
          </div>
          <MoreHorizontal
            size={28}
            className="mr-4"
            onClick={() => setDropDownOpen((prev) => !prev)}
          />
        </div>
        <div className="right-1 top-7 absolute">
          <ChatDropDown open={dropDownOpen} />
        </div>
      </div>
      <div className="chat-body grow flex flex-col ">채팅 내용</div>
      <div className="chat-foot flex flex-col">
        <div className="chat-textInput h-8 bg-white flex items-center justify-center">
          <Plus
            size={14}
            className="ml-2"
            onClick={() => setFileFormOpen((prev) => !prev)}
          />
          <input
            type="text"
            className="grow mx-2 my-4 rounded-md border border-[#CDC5AE] text-[#2e2e2e]"
            placeholder="메세지를 입력하세요"
          />
        </div>
        <ChatFileForm open={fileFormOpen} />
      </div>
    </div>
  );
}
