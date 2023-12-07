"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ISchedule,
  IDate,
  getStartDay,
  yearMonthChange,
  day,
  empty_day,
  selected_day,
  ITimeList,
} from "./const";

export default function DatePicker() {
  const now = new Date(); // 현재 Date 객체
  const [oppositeSchedule, setOppositeSchedule] = useState<ISchedule[]>([]); // 상대방이 선택한 일정
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [date, setDate] = useState<Array<number>>([]);
  const [selectDate, setSelectDate] = useState<IDate>({
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
  }); //선택한 날짜
  const [schedule, setSchedule] = useState<ISchedule[]>([]); // 사용자가 선택한 일정
  const [selectTime, setSelectTime] = useState<ITimeList>({
    start: { hour: -1, minute: -1 },
    end: { hour: -1, minute: -1 },
  }); //선택한 시간
  let sd = getStartDay({ year, month }); // 년-월 마다 시작 요일 세팅 변수

  useEffect(() => {
    const lastDay = new Date(year, month + 1, 0).getDate();
    const arr = new Array(lastDay).fill(0).map((_, i) => i + 1);
    setDate(arr);
    sd = getStartDay({ year, month });
  }, [year, month]); // 년-월 마다 시작 요일 세팅

  function timeListSort(timeList: ITimeList[]) {
    // 시작 시간과 종료 시간을 분 단위로 변경하여 시작 시간을 기준으로 정렬
    const sortedList = timeList
      .map((time) => ({
        start: time.start.hour * 60 + time.start.minute,
        end: time.end.hour * 60 + time.end.minute,
      }))
      .sort((a, b) => a.start - b.start);

    const newTemp = [];

    sortedList.forEach((time, index) => {
      // 겹치는 시간대가 있는지 순회 탐색 항상 out, r, l은 최대 한개까지 존재 하도록 해야함. out이 존재하면 나머지는 존재X
      const out = sortedList.filter((v, i) => {
        // 이미 포함되어 있는 시간대
        i > index && v.start < time.start && v.end > time.start;
      });
      const r = sortedList.filter((v, i) => {
        // right join 대상
        i > index && v.start > time.start && v.end > time.end;
      });
      const l = sortedList.filter((v, i) => {
        // left join 대상
        i > index && v.start < time.start && v.end < time.end;
      });
      if (out.length !== 0) {
        newTemp.push(out[0]);
      } else if (r.length! == 0 && l.length! == 0) {
        //right 도 존재하면서 l도 존재하면 r 과 l을 합쳐서 확장하면 됨.
        newTemp.push({ start: l[0].start, end: r[0].end });
      } else {
        newTemp.push(time);
      }
    });
  }

  // 일정 추가
  function pushSchedule({ s }: { s: ISchedule }) {
    const tempSchedule = [...schedule];
    const tempDate = tempSchedule.filter((v) => v.date === s.date); // 현재 같은 일정이 있는 지 추가
    if (tempDate.length === 0) {
      //해당 일자에 일정이 존재하지 않을 경우 추가
      tempSchedule.push(s);
    } else {
      //해당 일자에 일정이 존재할 경우 조건에 따라 맞춰서 추가
      const concatTimeList = tempDate[0].timeList.concat(s.timeList);
      const sortedTimeList = timeListSort(concatTimeList);

      //겹치는 시간대가 존재할 경우 겹치는 시간대가 있는지 검색

      //겹치는 시간대가 없을 경우 추가

      //겹치는 시간대가 있을 경우 + 기존의 시간대가 새로운 시간대를 포함하고 있을 경우

      //겹치는 시간대가 있을 경우 + 기존의 시간대가 새로운 시간대를 일부 포함하고 있을 경우

      //겹치는 시간대가 있을 경우 + 기존의 시간대가 새로운 시간대를 전혀 포함하고 있지 않을 경우
    }
    setSchedule((prev) => [...prev, s]);
  }

  return (
    <div className="backdrop-blur-sm w-full absolute top-16 left-0 z-50 h-[calc(100vh-4rem)] backdrop-brightness-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56rem] h-[28rem] flex flex-col">
        <div className="datepicker-header bg-rose-500 brightness-[0.95] h-[3.5rem] rounded-t-3xl flex justify-center items-center text-white text-3xl py-6">
          일정 조율 날짜 선택
        </div>
        <div className="datepicker-body bg-slate-100 flex grow rounded-b-3xl text-black">
          <div className="list border-r-2 border-neutral-400/60 my-4 w-[25%] px-6 flex flex-col items-center">
            <div>
              <p>상대방이 선택한 날짜</p>
            </div>
            <div>
              <p>선택하신 날짜</p>
            </div>
          </div>
          <div className="datepick border-r border-neutral-400/60 my-4 w-[40%] px-6 flex flex-col items-center">
            <p>날짜를 선택해주세요.</p>
            <Calendar
              date={date}
              start_day={getStartDay({ year, month })}
              month={month}
              year={year}
              setYear={setYear}
              setMonth={setMonth}
              selectDate={selectDate}
              setSelectDate={setSelectDate}
            />
          </div>
          <div className="timepick my-4 w-[35%] px-6 pb-8 flex flex-col items-center justify-between">
            <p>시간을 선택해주세요.</p>
            <TimePicker opposite={oppositeSchedule} />
            <button
              className="btn btn-primary w-full h-[61px] bg-[#DFD8D8] rounded-full border border-black text-black"
              onClick={() => pushSchedule}
            >
              추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar({
  date,
  start_day,
  year,
  month,
  setYear,
  setMonth,
  selectDate,
  setSelectDate,
}: {
  date: Array<number>;
  start_day: number;
  year: number;
  month: number;
  selectDate: IDate;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setSelectDate: Dispatch<SetStateAction<IDate>>;
}) {
  return (
    <div className="calendar w-full px-8 py-4 flex flex-col gap-y-4">
      <div className="calendar-head flex justify-between items-center">
        <div className="month">
          <p>
            {year}-{month + 1}
          </p>
        </div>
        <div className="month-select flex gap-x-2">
          <p
            onClick={() =>
              yearMonthChange({ month, setMonth, setYear, desc: true })
            }
            className="cursor-pointer"
          >
            {"<"}
          </p>
          <p
            onClick={() =>
              yearMonthChange({ month, setMonth, setYear, desc: false })
            }
            className="cursor-pointer"
          >
            {">"}
          </p>
        </div>
      </div>
      <div className="calendar-body flex flex-wrap gap-x-0.5 gap-y-1">
        {new Array(start_day).fill(0).map((_, i) => (
          <div key={`empty-${i}`} className={empty_day}></div>
        ))}
        {date.map((item, index) => (
          <div
            className={index + 1 === selectDate.date ? selected_day : day}
            onClick={() =>
              setSelectDate({ year: year, month: month, date: index + 1 })
            }
            key={`day-${index}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimePicker({ opposite }: { opposite: ISchedule[] }) {
  const hour_list = new Array(24).fill(0).map((_, i) => i);
  const minute_list = new Array(6).fill(0).map((_, i) => i * 10);
  const [select, setSelect] = useState({
    start: { hour: -1, minute: -1 },
    end: { hour: -1, minute: -1 },
  });

  function pushSelect({ hour, minute }: { hour: number; minute: number }) {
    if (select.start.hour === -1 && select.end.hour === -1) {
      setSelect((prev) => ({ ...prev, start: { hour, minute } }));
      //아무것도 선택되어 있지 않은 경우 시작 시간에 추가
    } else if (select.start.hour !== -1 && select.end.hour === -1) {
      //시작 시간만 선택되어 있는 경우
      if (hour === select.start.hour && minute === select.start.minute) {
        //시작시간과 같은 시간을 선택했을 때 시작 시간 설정값 취소
        setSelect((prev) => ({ ...prev, start: { hour: -1, minute: -1 } }));
      } else if (
        hour > select.start.hour ||
        (hour === select.start.hour && minute > select.start.minute)
      ) {
        //시작 시간보다 뒤의 시간을 선택했을 때 끝 시간에 추가
        setSelect((prev) => ({ ...prev, end: { hour, minute } }));
      } else if (
        hour < select.start.hour ||
        (hour === select.start.hour && minute < select.start.minute)
      ) {
        //시작 시간보다 앞의 시간을 선택했을 때 시작 시간에 추가
        setSelect((prev) => ({ end: prev.start, start: { hour, minute } }));
      }
    } else if (select.start.hour === -1 && select.end.hour !== -1) {
      //끝 시간만 선택되어 있는 경우
      if (hour === select.end.hour && minute === select.end.minute) {
        //끝 시간과 같은 시간을 선택했을 때 끝 시간 설정값 취소
        setSelect((prev) => ({ ...prev, end: { hour: -1, minute: -1 } }));
      } else if (
        hour < select.end.hour ||
        (hour === select.end.hour && minute < select.end.minute)
      ) {
        //끝 시간보다 앞의 시간을 선택했을 때 시작 시간에 추가
        setSelect((prev) => ({ ...prev, start: { hour, minute } }));
      } else if (
        hour > select.end.hour ||
        (hour === select.end.hour && minute > select.end.minute)
      ) {
        //끝 시간보다 뒤의 시간을 선택했을 때 끝 시간에 추가
        setSelect((prev) => ({ start: prev.end, end: { hour, minute } }));
      }
    } else {
      //모두 선택되어 있을 경우
      if (hour === select.start.hour && minute === select.start.minute) {
        //시작 시간과 같은 시간을 선택했을 때 시작 시간 설정값 취소
        setSelect((prev) => ({ ...prev, start: { hour: -1, minute: -1 } }));
      } else if (hour === select.end.hour && minute === select.end.minute) {
        //끝 시간과 같은 시간을 선택했을 때 끝 시간 설정값 취소
        setSelect((prev) => ({ ...prev, end: { hour: -1, minute: -1 } }));
      } else if (
        hour > select.start.hour ||
        (hour === select.start.hour && minute > select.start.minute)
      ) {
        //시작 시간보다 뒤의 시간을 선택했을 때
        if (
          hour < select.end.hour ||
          (hour === select.end.hour && minute < select.end.minute)
        ) {
          //끝 시간보다 적으면 시작 시간 변경
          setSelect((prev) => ({ ...prev, start: { hour, minute } }));
        } else {
          //끝 시간보다 크면 끝 시간 변경
          setSelect((prev) => ({ start: prev.end, end: { hour, minute } }));
        }
      } else if (
        hour < select.end.hour ||
        (hour === select.end.hour && minute < select.end.minute)
      ) {
        //끝 시간보다 앞의 시간을 선택했을 때
        if (
          hour > select.start.hour ||
          (hour === select.start.hour && minute > select.start.minute)
        ) {
          //시작 시간보다 크면 끝 시간 변경
          setSelect((prev) => ({ ...prev, end: { hour, minute } }));
        } else {
          //시작 시간보다 작으면 시작 시간 변경
          setSelect((prev) => ({ ...prev, start: { hour, minute } }));
        }
      }
    }
  }

  return (
    <div className="timepicker flex flex-col gap-x-12 max-h-[11rem] overflow-hidden text-xl -mt-10 items-center">
      {select.start.hour !== -1 && select.end.hour !== -1 ? (
        <p className="">
          선택하신 시간 :{" "}
          {`${select.start.hour}:${select.start.minute
            .toString()
            .padStart(2, "0")}~${select.end.hour}:${select.end.minute
            .toString()
            .padStart(2, "0")}`}
        </p>
      ) : (
        <></>
      )}
      <div className="hour-select overflow-y-scroll scrollbar-hide border-2 flex flex-col gap-y-4 items-center">
        {hour_list.map((h_item, h_index) => (
          <div
            className="flex flex-wrap gap-x-1 text-lg"
            key={`hour-${h_index}`}
          >
            {minute_list.map((m_item, m_index) => (
              <div
                className={
                  "hour-minute-item flex px-2 rounded-2xl justify-center items-center border-2 border-orange-50 cursor-pointer hover:bg-rose-200/60 " +
                  (select.start.hour === h_item &&
                  select.start.minute === m_item
                    ? "bg-rose-600/60"
                    : select.end.hour === h_item && select.end.minute === m_item
                    ? "bg-rose-600/60"
                    : "bg-rose-50 ")
                }
                key={`${h_index}-${m_index}`}
                onClick={() => pushSelect({ hour: h_item, minute: m_item })}
              >
                {h_item + ":" + m_item.toString().padStart(2, "0")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
