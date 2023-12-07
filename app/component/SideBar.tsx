export default function SideBar({ isFold }: { isFold: boolean }) {
  return (
    <div
      className="sidebar min-h-[calc(100vh-4rem)] z-50 absolute top-16 left-0 bg-black opacity-70"
      hidden={!isFold}
    ></div>
  );
}
