import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Slider,
} from "@nextui-org/react";
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { ReactNode, createContext, useContext, useState } from "react";
import { FilterContextType, IFilter } from "./const";
import { set } from "zod";

export default function Filter() {
  const { filterOption, setFilterOption, showFilter, setShowFilter } =
    useFilter();

  return (
    <div
      className="absolute top-28 z-50 right-4 scrollbar-hide bg-[#272727] text-white w-96 h-[30rem] overflow-y-scroll rounded-lg flex flex-col py-4 px-4"
      style={{ display: showFilter ? "" : "none" }}
    >
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
          color={filterOption.RentType.jeonse ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              RentType: { ...prev.RentType, jeonse: !prev.RentType.jeonse },
            }));
          }}
          className={filterOption.RentType.jeonse ? "" : "text-[#ADAAAA]"}
        >
          전세
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.RentType.monthly ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              RentType: { ...prev.RentType, monthly: !prev.RentType.monthly },
            }));
          }}
          className={filterOption.RentType.monthly ? "" : "text-[#ADAAAA]"}
        >
          월세
        </Button>
      </div>
      <div className="flex justify-between">
        <p>보증금</p>
        <div className="text-primary-300">
          <span>
            {filterOption.Deposit.max !== 0 || filterOption.Deposit.min !== 0
              ? filterOption.Deposit.max === 1000000000 &&
                filterOption.Deposit.min === 0
                ? ""
                : `${filterOption.Deposit.min / 10000} 만원 ~ `
              : ""}
          </span>
          <span>
            {filterOption.Deposit.max === 1000000000
              ? filterOption.Deposit.min === 0
                ? ""
                : "10억"
              : `${filterOption.Deposit.max / 10000} 만원`}
          </span>
        </div>
      </div>
      <div className="w-full max-w-md h-fit">
        <Slider
          size="md"
          step={1000000}
          maxValue={100000000}
          minValue={0}
          aria-label="보증금"
          defaultValue={[0, 100000000]}
          onChange={(e) => {
            if (typeof e === "object") {
              setFilterOption((prev: any) => ({
                ...prev,
                Deposit: { min: e[0], max: e[1] },
              }));
            }
          }}
        />
        <div className="flex justify-between">
          <p>0</p>
          <div className="grow"></div>
          <p>MAX</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>월세</p>
        <div className="text-primary-300">
          <span>
            {filterOption.MonthlyFee.max !== 0 ||
            filterOption.MonthlyFee.min !== 0
              ? filterOption.MonthlyFee.max === 10000000 &&
                filterOption.MonthlyFee.min === 0
                ? ""
                : `${filterOption.MonthlyFee.min / 10000} 만원 ~ `
              : ""}
          </span>
          <span>
            {filterOption.MonthlyFee.max === 10000000
              ? filterOption.MonthlyFee.min === 0
                ? ""
                : "MAX"
              : `${filterOption.MonthlyFee.max / 10000} 만원`}
          </span>
        </div>
      </div>
      <div className="w-full max-w-md h-fit">
        <Slider
          size="md"
          step={10000}
          maxValue={10000000}
          minValue={0}
          aria-label="월세"
          defaultValue={[0, 10000000]}
          onChange={(e) => {
            if (typeof e === "object") {
              setFilterOption((prev: any) => ({
                ...prev,
                MonthlyFee: { min: e[0], max: e[1] },
              }));
            }
          }}
        />
        <div className="flex justify-between">
          <p>0</p>
          <div className="grow"></div>
          <p>MAX</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>관리비</p>
        <div className="text-primary-300">
          <span>
            {filterOption.MaintenanceFee.max !== 0 ||
            filterOption.MaintenanceFee.min !== 0
              ? filterOption.MaintenanceFee.max === 10000000 &&
                filterOption.MaintenanceFee.min === 0
                ? ""
                : `${filterOption.MaintenanceFee.min / 10000} 만원 ~ `
              : ""}
          </span>
          <span>
            {filterOption.MaintenanceFee.max === 10000000
              ? filterOption.MaintenanceFee.min === 0
                ? ""
                : "MAX"
              : `${filterOption.MaintenanceFee.max / 10000} 만원`}
          </span>
        </div>
      </div>
      <div className="w-full max-w-md h-fit">
        <Slider
          size="md"
          step={10000}
          maxValue={1000000}
          minValue={0}
          aria-label="관리비"
          defaultValue={[0, 1000000]}
          onChange={(e) => {
            if (typeof e === "object") {
              setFilterOption((prev: any) => ({
                ...prev,
                MaintenanceFee: { min: e[0], max: e[1] },
              }));
            }
          }}
        />
        <div className="flex justify-between">
          <p>0</p>
          <div className="grow"></div>
          <p>MAX</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>평수</p>
        <div className="text-primary-300">
          <span>
            {filterOption.RoomSize.max !== 0 || filterOption.RoomSize.min !== 0
              ? filterOption.RoomSize.max === 100 &&
                filterOption.RoomSize.min === 0
                ? ""
                : `${filterOption.RoomSize.min} 평 ~ `
              : ""}
          </span>
          <span>
            {filterOption.RoomSize.max === 100
              ? filterOption.RoomSize.min === 0
                ? ""
                : "MAX"
              : `${filterOption.RoomSize.max} 평`}
          </span>
        </div>
      </div>
      <div className="w-full max-w-md h-fit">
        <Slider
          size="md"
          step={1}
          maxValue={100}
          minValue={0}
          aria-label="평수"
          defaultValue={[0, 100]}
          onChange={(e) => {
            if (typeof e === "object") {
              setFilterOption((prev: any) => ({
                ...prev,
                RoomSize: { min: e[0], max: e[1] },
              }));
            }
          }}
        />
        <div className="flex justify-between">
          <p>0</p>
          <div className="grow"></div>
          <p>MAX</p>
        </div>
      </div>

      <p>구역</p>
      <div className="flex gap-x-2 w-full flex-wrap gap-y-2">
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.Area.uman ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              Area: { ...prev.Area, uman: !prev.Area.uman },
            }));
          }}
          className={filterOption.Area.uman ? "" : "text-[#ADAAAA]"}
        >
          우만동
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.Area.gwanggyo ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              Area: { ...prev.Area, gwanggyo: !prev.Area.gwanggyo },
            }));
          }}
          className={filterOption.Area.gwanggyo ? "" : "text-[#ADAAAA]"}
        >
          광교
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.Area.ingyedong ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              Area: { ...prev.Area, ingyedong: !prev.Area.ingyedong },
            }));
          }}
          className={filterOption.Area.ingyedong ? "" : "text-[#ADAAAA]"}
        >
          인계동
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.Area.woncheon ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              Area: { ...prev.Area, woncheon: !prev.Area.woncheon },
            }));
          }}
          className={filterOption.Area.woncheon ? "" : "text-[#ADAAAA]"}
        >
          원천동
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.Area.maetan ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              Area: { ...prev.Area, maetan: !prev.Area.maetan },
            }));
          }}
          className={filterOption.Area.maetan ? "" : "text-[#ADAAAA]"}
        >
          매탄동
        </Button>
      </div>
      <p>방종류</p>
      <div className="flex gap-x-2 w-full flex-wrap">
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.RoomType.studio ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              RoomType: { ...prev.RoomType, studio: !prev.RoomType.studio },
            }));
          }}
          className={filterOption.RoomType.studio ? "" : "text-[#ADAAAA]"}
        >
          원룸
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.RoomType["two-threeRoom"] ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              RoomType: {
                ...prev.RoomType,
                "two-threeRoom": !prev.RoomType["two-threeRoom"],
              },
            }));
          }}
          className={
            filterOption.RoomType["two-threeRoom"] ? "" : "text-[#ADAAAA]"
          }
        >
          투쓰리룸
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.RoomType.officetel ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              RoomType: {
                ...prev.RoomType,
                officetel: !prev.RoomType.officetel,
              },
            }));
          }}
          className={filterOption.RoomType.officetel ? "" : "text-[#ADAAAA]"}
        >
          오피스텔
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.RoomType.apartment ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              RoomType: {
                ...prev.RoomType,
                apartment: !prev.RoomType.apartment,
              },
            }));
          }}
          className={filterOption.RoomType.apartment ? "" : "text-[#ADAAAA]"}
        >
          아파트
        </Button>
      </div>
      <p>층수</p>
      <div className="flex gap-x-4 flex-wrap gap-y-2">
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.first ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, first: !prev.floor.first },
            }));
          }}
          className={filterOption.floor.first ? "" : "text-[#ADAAAA]"}
        >
          1층
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.second ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, second: !prev.floor.second },
            }));
          }}
          className={filterOption.floor.second ? "" : "text-[#ADAAAA]"}
        >
          2층
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.third ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, third: !prev.floor.third },
            }));
          }}
          className={filterOption.floor.third ? "" : "text-[#ADAAAA]"}
        >
          3층
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.fourth ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, fourth: !prev.floor.fourth },
            }));
          }}
          className={filterOption.floor.fourth ? "" : "text-[#ADAAAA]"}
        >
          4층
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.fifth ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, fifth: !prev.floor.fifth },
            }));
          }}
          className={filterOption.floor.fifth ? "" : "text-[#ADAAAA]"}
        >
          5층
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.sixth ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, sixth: !prev.floor.sixth },
            }));
          }}
          className={filterOption.floor.sixth ? "" : "text-[#ADAAAA]"}
        >
          6층
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.seventhUpper ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, seventhUpper: !prev.floor.seventhUpper },
            }));
          }}
          className={filterOption.floor.seventhUpper ? "" : "text-[#ADAAAA]"}
        >
          7층이상
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.top ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, top: !prev.floor.top },
            }));
          }}
          className={filterOption.floor.top ? "" : "text-[#ADAAAA]"}
        >
          옥탑방
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.floor.under ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              floor: { ...prev.floor, under: !prev.floor.under },
            }));
          }}
          className={filterOption.floor.under ? "" : "text-[#ADAAAA]"}
        >
          반지하
        </Button>
      </div>
      <p>옵션</p>
      <div className="flex gap-x-4 flex-wrap gap-y-2">
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.elevator ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, elevator: !prev.option.elevator },
            }));
          }}
          className={filterOption.option.elevator ? "" : "text-[#ADAAAA]"}
        >
          엘레베이터
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.park ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, park: !prev.option.park },
            }));
          }}
          className={filterOption.option.park ? "" : "text-[#ADAAAA]"}
        >
          공원
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.cctv ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, cctv: !prev.option.cctv },
            }));
          }}
          className={filterOption.option.cctv ? "" : "text-[#ADAAAA]"}
        >
          CCTV
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.doorLock ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, doorLock: !prev.option.doorLock },
            }));
          }}
          className={filterOption.option.doorLock ? "" : "text-[#ADAAAA]"}
        >
          도어락
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.pet ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, pet: !prev.option.pet },
            }));
          }}
          className={filterOption.option.pet ? "" : "text-[#ADAAAA]"}
        >
          애완동물
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.veranda ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, veranda: !prev.option.veranda },
            }));
          }}
          className={filterOption.option.veranda ? "" : "text-[#ADAAAA]"}
        >
          베란다
        </Button>
        <ButtonGroup variant="flat">
          <Button
            size="sm"
            radius="full"
            variant="bordered"
            color={
              filterOption.option.range !== "false" ? "primary" : "default"
            }
            className={
              filterOption.option.range !== "false" ? "" : "text-[#ADAAAA]"
            }
          >
            {filterOption.option.range === "gas"
              ? "가스레인지"
              : filterOption.option.range === "induction"
              ? "인덕션"
              : "없음"}
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                size="sm"
                radius="full"
                variant="bordered"
                color={
                  filterOption.option.range !== "false" ? "primary" : "default"
                }
                className={
                  "w-6 h-8 " +
                  (filterOption.option.range !== "false"
                    ? ""
                    : "text-[#ADAAAA]")
                }
              >
                <ChevronDownIcon className="w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="range options"
              selectedKeys={filterOption.option.range}
              selectionMode="single"
              onSelectionChange={(e: any) => {
                setFilterOption((prev: any) => ({
                  ...prev,
                  option: { ...prev.option, range: e?.anchorKey },
                }));
              }}
              className="max-w-8"
            >
              <DropdownItem key="induction">{"인덕션"}</DropdownItem>
              <DropdownItem key="gas">{"가스레인지"}</DropdownItem>
              <DropdownItem key="false">{"없음"}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
        <ButtonGroup variant="flat">
          <Button
            size="sm"
            radius="full"
            variant="bordered"
            color={
              filterOption.option.airConditioner !== "false"
                ? "primary"
                : "default"
            }
            className={
              filterOption.option.airConditioner !== "false"
                ? ""
                : "text-[#ADAAAA]"
            }
          >
            {filterOption.option.airConditioner === "top"
              ? "천장형"
              : filterOption.option.airConditioner === "wall"
              ? "벽걸이"
              : filterOption.option.airConditioner === "stand"
              ? "스탠드"
              : "없음"}
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                size="sm"
                radius="full"
                variant="bordered"
                color={
                  filterOption.option.airConditioner !== "false"
                    ? "primary"
                    : "default"
                }
                className={
                  "w-6 h-8 " +
                  (filterOption.option.airConditioner !== "false"
                    ? ""
                    : "text-[#ADAAAA]")
                }
              >
                <ChevronDownIcon className="w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="airConditioner options"
              selectedKeys={filterOption.option.airConditioner}
              selectionMode="single"
              onSelectionChange={(e: any) => {
                setFilterOption((prev: any) => ({
                  ...prev,
                  option: { ...prev.option, airConditioner: e?.anchorKey },
                }));
              }}
              className="max-w-8"
            >
              <DropdownItem key="top">{"천장형"}</DropdownItem>
              <DropdownItem key="wall">{"벽걸이"}</DropdownItem>
              <DropdownItem key="stand">{"스탠드"}</DropdownItem>
              <DropdownItem key="false">{"없음"}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.refrigerator ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: {
                ...prev.option,
                refrigerator: !prev.option.refrigerator,
              },
            }));
          }}
          className={filterOption.option.refrigerator ? "" : "text-[#ADAAAA]"}
        >
          냉장고
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.sink ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, sink: !prev.option.sink },
            }));
          }}
          className={filterOption.option.sink ? "" : "text-[#ADAAAA]"}
        >
          싱크대
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.tv ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, tv: !prev.option.tv },
            }));
          }}
          className={filterOption.option.tv ? "" : "text-[#ADAAAA]"}
        >
          TV
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.internet ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, internet: !prev.option.internet },
            }));
          }}
          className={filterOption.option.internet ? "" : "text-[#ADAAAA]"}
        >
          인터넷
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.bed ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, bed: !prev.option.bed },
            }));
          }}
          className={filterOption.option.bed ? "" : "text-[#ADAAAA]"}
        >
          침대
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.desk ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, desk: !prev.option.desk },
            }));
          }}
          className={filterOption.option.desk ? "" : "text-[#ADAAAA]"}
        >
          책상
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.microwave ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, microwave: !prev.option.microwave },
            }));
          }}
          className={filterOption.option.microwave ? "" : "text-[#ADAAAA]"}
        >
          전자레인지
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.closet ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, closet: !prev.option.closet },
            }));
          }}
          className={filterOption.option.closet ? "" : "text-[#ADAAAA]"}
        >
          옷장
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.shoeRack ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, shoeRack: !prev.option.shoeRack },
            }));
          }}
          className={filterOption.option.shoeRack ? "" : "text-[#ADAAAA]"}
        >
          신발장
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.bidet ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, bidet: !prev.option.bidet },
            }));
          }}
          className={filterOption.option.bidet ? "" : "text-[#ADAAAA]"}
        >
          비데
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.interphone ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, interphone: !prev.option.interphone },
            }));
          }}
          className={filterOption.option.interphone ? "" : "text-[#ADAAAA]"}
        >
          인터폰
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.parking ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, parking: !prev.option.parking },
            }));
          }}
          className={filterOption.option.parking ? "" : "text-[#ADAAAA]"}
        >
          주차장
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.security ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, security: !prev.option.security },
            }));
          }}
          className={filterOption.option.security ? "" : "text-[#ADAAAA]"}
        >
          경비원
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.deilveryBox ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: { ...prev.option, deilveryBox: !prev.option.deilveryBox },
            }));
          }}
          className={filterOption.option.deilveryBox ? "" : "text-[#ADAAAA]"}
        >
          택배수거함
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.BuildingEntrance ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: {
                ...prev.option,
                BuildingEntrance: !prev.option.BuildingEntrance,
              },
            }));
          }}
          className={
            filterOption.option.BuildingEntrance ? "" : "text-[#ADAAAA]"
          }
        >
          건물출입문
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="bordered"
          color={filterOption.option.washingMachine ? "primary" : "default"}
          onPress={() => {
            setFilterOption((prev: any) => ({
              ...prev,
              option: {
                ...prev.option,
                washingMachine: !prev.option.washingMachine,
              },
            }));
          }}
          className={filterOption.option.washingMachine ? "" : "text-[#ADAAAA]"}
        >
          식기세척기
        </Button>
      </div>
    </div>
  );
}

const FilterContext = createContext<FilterContextType | null>(null);

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error("Cannot find FilterProvider");
  }
  return context;
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filterOption, setFilterOption] = useState<IFilter>({
    Area: {
      gwanggyo: true,
      ingyedong: true,
      uman: true,
      woncheon: true,
      maetan: true,
    },
    RoomType: {
      studio: true,
      "two-threeRoom": true,
      officetel: true,
      apartment: true,
    },
    RentType: { monthly: true, jeonse: true },
    Deposit: { min: 0, max: 1000000000 },
    MonthlyFee: { min: 0, max: 10000000 },
    MaintenanceFee: { min: 0, max: 10000000 },
    RoomSize: { min: 0, max: 100 },
    floor: {
      first: true,
      second: true,
      third: true,
      fourth: true,
      fifth: true,
      sixth: true,
      seventhUpper: true,
      top: true, //옥탑방
      under: true, //반지하
    },
    option: {
      elevator: true,
      park: true,
      cctv: true,
      doorLock: true,
      pet: true,
      veranda: true,
      range: "gas",
      airConditioner: "wall",
      refrigerator: true,
      sink: true,
      tv: true,
      internet: true,
      bed: true,
      desk: true,
      microwave: true,
      closet: true,
      shoeRack: true,
      bidet: true,
      interphone: true,
      parking: true,
      security: true,
      deilveryBox: true,
      BuildingEntrance: true,
      washingMachine: true,
    },
  });
  const [showFilter, setShowFilter] = useState<boolean>(false);

  return (
    <FilterContext.Provider
      value={{ filterOption, setFilterOption, showFilter, setShowFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
}
