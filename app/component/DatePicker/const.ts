//r -> opposite
//g -> cross-checked
//b -> ally

import { Dispatch, SetStateAction } from "react";

export const day =
  "rounded-full w-[2rem] h-[2rem] flex justify-center items-center bg-rose-200/30 flex justify-center items-center cursor-pointer hover:bg-rose-200/60";

export const selected_day =
  "rounded-full w-[2rem] h-[2rem] bg-rose-600/60  flex justify-center items-center";

export const empty_day = "rounded-full w-[2rem] h-[2rem]";

export interface ISchedule {
  date: IDate;
  timeList: ITimeList[];
}

export interface ITimeList {
  start: { hour: number; minute: number };
  end: { hour: number; minute: number };
}

export interface IDate {
  year: number;
  month: number;
  date: number;
}

export function yearMonthChange({
  month,
  setMonth,
  setYear,
  desc,
}: {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
  desc: boolean;
}) {
  if (desc) {
    //감소
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  } else {
    //증가
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  }
}

export function getStartDay({ year, month }: { year: number; month: number }) {
  const tt = new Date(year, month, 1).getDay();
  return tt;
}
