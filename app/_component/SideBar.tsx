export default function SideBar({
  isFold,
  setFold,
}: {
  isFold: boolean;
  setFold: (fold: boolean) => void;
}) {
  return (
    <div className="sidebar min-h-full bg-black opacity-70" hidden={!isFold}>
      12321143사이드바
    </div>
  );
}
