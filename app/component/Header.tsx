"use client";
import { AlignLeft, HelpCircle } from "lucide-react";
import { useSideBar } from "../hook";

export default function Header() {
  const { fold, setFold } = useSideBar();
  return (
    <div className="flex items-center justify-between h-16 bg-[#605D5D] text-white">
      <div className="flex items-center mr-8 ml-4">
        <AlignLeft size={36} onClick={() => setFold(!fold)} />
      </div>
      <div className="flex items-center text-4xl">PlatHome</div>
      <div className="flex items-center mr-8">
        <HelpCircle size={32} />
      </div>
    </div>
  );
}
