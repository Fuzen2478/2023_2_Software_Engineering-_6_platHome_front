import { Button, Slider } from "@nextui-org/react";
import { FilterIcon } from "lucide-react";
import { useState } from "react";

export default function Filter() {
  const [transactionType, setTransactionType] = useState({
    jeonse: true,
    monthly: true,
  });
  return (
    <div className="absolute top-28 z-50 right-4 bg-[#272727] text-white w-96 h-fit rounded-lg flex flex-col py-4 px-4">
      <div className="flex w-full justify-center gap-x-2">
        <FilterIcon size={24} />
        <p>필터</p>
      </div>
      <p>거래유형</p>
      <div className="flex gap-x-4">
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={transactionType.jeonse ? "primary" : "default"}
          onPress={() => {
            setTransactionType({
              ...transactionType,
              jeonse: !transactionType.jeonse,
            });
          }}
          className={transactionType.jeonse ? "" : "text-[#ADAAAA]"}
        >
          전세
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={transactionType.monthly ? "primary" : "default"}
          onPress={() => {
            setTransactionType({
              ...transactionType,
              monthly: !transactionType.monthly,
            });
          }}
          className={transactionType.monthly ? "" : "text-[#ADAAAA]"}
        >
          월세
        </Button>
      </div>
      <p>보증금</p>
      <div className="w-full max-w-md h-6">
        <Slider
          size="md"
          step={0.01}
          maxValue={1}
          minValue={0}
          aria-label="보증금"
          defaultValue={0.2}
          onChange={() => {}}
        />
      </div>
      <p>월세</p>
      <div className="w-full max-w-md h-6">
        <Slider
          size="md"
          step={0.01}
          maxValue={1}
          minValue={0}
          aria-label="보증금"
          defaultValue={0.2}
          onChange={() => {}}
        />
      </div>
      <p>관리비</p>
      <div className="w-full max-w-md h-6">
        <Slider
          size="md"
          step={0.01}
          maxValue={1}
          minValue={0}
          aria-label="보증금"
          defaultValue={0.2}
          onChange={() => {}}
        />
      </div>
      <p>평수</p>
      <div className="w-full max-w-md h-6">
        <Slider
          size="md"
          step={0.01}
          maxValue={1}
          minValue={0}
          aria-label="보증금"
          defaultValue={0.2}
          onChange={() => {}}
        />
      </div>
      <p>구역</p>
      <div className="flex gap-x-4">
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={transactionType.jeonse ? "primary" : "default"}
          onPress={() => {
            setTransactionType({
              ...transactionType,
              jeonse: !transactionType.jeonse,
            });
          }}
          className={transactionType.jeonse ? "" : "text-[#ADAAAA]"}
        >
          우만동
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={transactionType.monthly ? "primary" : "default"}
          onPress={() => {
            setTransactionType({
              ...transactionType,
              monthly: !transactionType.monthly,
            });
          }}
          className={transactionType.monthly ? "" : "text-[#ADAAAA]"}
        >
          광교
        </Button>
      </div>
      <p>방종류</p>
      <div className="flex gap-x-4"></div>
      <p>층수</p>
      <div className="flex gap-x-4"></div>
      <p>옵션</p>
      <div className="flex gap-x-4"></div>
    </div>
  );
}
