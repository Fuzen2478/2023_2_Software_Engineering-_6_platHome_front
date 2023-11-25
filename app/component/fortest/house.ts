export interface houseInfoType {
  id: number;
  roomType: string;
  paymentType: string;
  deposit: number;
  monthly: number;
  managementFee: number;
  floor: number;
  area: number;
  description: string;
  thumbnail: string;
}

export const house_test_data: houseInfoType[] = [
  {
    id: 1,
    roomType: "원룸",
    paymentType: "월세",
    deposit: 1000,
    monthly: 50,
    managementFee: 6,
    floor: 2,
    area: 14.71,
    description: "여긴 2층입니다.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    roomType: "원룸",
    paymentType: "전세",
    deposit: 5000,
    monthly: 0,
    managementFee: 8,
    floor: 1,
    area: 15.52,
    description: "여긴 1층입니다.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    roomType: "원룸",
    paymentType: "전세",
    deposit: 5500,
    monthly: 0,
    managementFee: 12,
    floor: 2,
    area: 33.12,
    description: "여긴 2층입니다.",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    roomType: "원룸",
    paymentType: "월세",
    deposit: 2000,
    monthly: 30,
    managementFee: 6,
    floor: 1,
    area: 14.71,
    description: "여긴 1층입니다.",
    thumbnail: "https://via.placeholder.com/150",
  },
];
