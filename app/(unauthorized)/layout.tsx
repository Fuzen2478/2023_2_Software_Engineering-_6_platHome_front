"use client";
import "@/app/globals.css";
import Header from "../component/Header";
import { SocketProvider } from "../(authorized)/chat/Socket";
import Script from "next/script";
import { Chat } from "../(authorized)/chat/Chat";
import SideBar, {
  ShowSideBarProvider,
  useShowSideBar,
} from "../component/SideBar";
import DatePicker from "../component/DatePicker";
import LoginForm, { ShowLoginProvider } from "../component/auth/LoginForm";
import MyInfoModal from "../(authorized)/myInfo/modal";
import { MyInfoProvider } from "../hook";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { showSideBar, setShowSideBar } = useShowSideBar();
  return (
    <SocketProvider>
      <ShowLoginProvider>
        <MyInfoProvider>
          <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f1494ad8df2a9262259940f691221ac9&libraries=services,clusterer&autoload=false"
            strategy="beforeInteractive"
          />
          <div className="flex min-h-screen flex-col text-black">
            <Header />
            <div className="flex flex-col max-h-[calc(100vh-5rem)]">
              <SideBar isFold={showSideBar} />
              {children}
              <div className="chatting-container fixed bottom-0 right-0 z-50">
                <Chat />
              </div>
            </div>
          </div>
          {/* <DatePicker /> */}
          <LoginForm />
          <MyInfoModal />
        </MyInfoProvider>
      </ShowLoginProvider>
    </SocketProvider>
  );
}
