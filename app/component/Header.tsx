"use client";
import { AlignLeft, HelpCircle, UserCircle } from "lucide-react";
import { useShowLogin } from "./auth/LoginForm";
import { useShowSideBar } from "./SideBar";

export default function Header() {
  const { showSideBar, setShowSideBar } = useShowSideBar();
  const { showLoginForm, setShowLoginForm } = useShowLogin();
  return (
    <div className="flex items-center justify-between h-16 bg-[#272829] text-primary font-bold">
      <div className="flex items-center mr-8 ml-4">
        <AlignLeft size={36} onClick={() => setShowSideBar((prev) => !prev)} />
      </div>
      <div className="flex items-center text-4xl">PlatHome</div>
      <div className="flex items-center mr-8 gap-x-6">
        <HelpCircle size={32} />
        <UserCircle
          size={32}
          onClick={() => {
            const ls = localStorage.getItem("access-key");
            if (ls === null) {
              setShowLoginForm((prev) => !prev);
            } else {
              //
            }
          }}
        />
      </div>
    </div>
  );
}
