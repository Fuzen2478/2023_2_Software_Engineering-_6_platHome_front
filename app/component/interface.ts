export interface IUserReport {
  id: number;
  userId: number;
  reporterId: number;
  contents: string;
}

export interface IEstateReport {
  id: number;
  estateId: number;
  reporterId?: number;
  reporterContact?: string; //email
  contents: string;
}
//매물 신고는 비로그인 상태에서도 가능하다면 reporterId 혹은 reporterContact를 기입하여 연락망을 남겨둠.

export interface IUser {
  userId: number;
  email: string;
  username: string;
}

export const IEstateStringConvert = {
  MONTHLY: "월세",
  JEONSE: "전세",
  UMAN: "우만동",
  GWANGGYO: "광교",
  INGYEDONG: "인계동",
  WONCHEON: "원천동",
  MAETAN: "매탄동",
  STUDIO: "원룸",
  "TWO-THREEROOM": "투쓰리룸",
  OFFICETEL: "오피스텔",
  APARTMENT: "아파트",
  FIRST: "1층",
  SECOND: "2층",
  THIRD: "3층",
  FOURTH: "4층",
  FIFTH: "5층",
  SIXTH: "6층",
  SEVENTHUPPER: "7층 이상",
  TOP: "옥탑방",
  UNDER: "반지하",
  "RANGE.INDUCTION": "인덕션",
  "RANGE.GAS": "가스레인지",
  ELEVATOR: "엘리베이터",
  PARK: "공원",
  CCTV: "CCTV",
  DOORLOCK: "도어락",
  PET: "반려동물",
  VERANDA: "베란다",
  "AIRCONDITIONER.TOP": "천장형 에어컨",
  "AIRCONDITIONER.WALL": "벽걸이 에어컨",
  "AIRCONDITIONER.STAND": "스탠드형 에어컨",
  REFRIGERATOR: "냉장고",
  SINK: "싱크대",
  TV: "TV",
  INTERNET: "인터넷",
  BED: "침대",
  DESK: "책상",
  MICROWAVE: "전자레인지",
  CLOSET: "옷장",
  SHOERACK: "신발장",
  BIDET: "비데",
  INTERPHONE: "인터폰",
  PARKING: "주차",
  SECURITY: "경비원",
  DEILVERYBOX: "택배함",
  BUILDINGENTRANCE: "건물출입문",
  WASHINGMACHINE: "식기세척기",
};

//userId에 피신고 유저의 Id, reporterId에 신고자의 Id를 기입함.
