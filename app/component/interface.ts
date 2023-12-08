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

//userId에 피신고 유저의 Id, reporterId에 신고자의 Id를 기입함.
