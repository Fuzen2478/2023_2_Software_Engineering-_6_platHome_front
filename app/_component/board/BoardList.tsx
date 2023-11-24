"use client";

import { house_test_data } from "@/app/_component/fortest/house";
import HousePreview from "./HousePreview";

export default function BoardList() {
  // TODO: 정보 불러와서 집어넣기

  return (
    <section className="grid grid-cols-2 gap-y-8 w-full px-24">
      {house_test_data.map((house) => (
        <HousePreview key={house.id} house={house} />
      ))}
    </section>
  );
}
