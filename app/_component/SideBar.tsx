export default function SideBar({ isFold, setFold }: { isFold: boolean; setFold: (fold: boolean) => void }) {
  return <div hidden={!isFold}>12321143사이드바</div>;
}
