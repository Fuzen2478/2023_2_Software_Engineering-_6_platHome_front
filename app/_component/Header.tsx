import { AlignLeft, HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 bg-[#605D5D] text-white">
      <div className="flex items-center mr-8 ml-4">
        <AlignLeft size={36} />
      </div>
      <div className="flex items-center text-4xl">PlatHome</div>
      <div className="flex items-center mr-8">
        <HelpCircle size={32} />
      </div>
    </header>
  );
}
