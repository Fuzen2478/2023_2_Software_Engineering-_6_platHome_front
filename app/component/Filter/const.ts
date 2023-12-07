export interface IFilter {
  transactionType: {
    jeonse: boolean;
    monthly: boolean;
  };
  deposit: number;
  monthly: number;
  maintenanceFee: number;
  sqaureFeet: number;
  area: {
    UMAN: boolean;
    GWANGWO: boolean;
    INGYE: boolean;
    WONCHEON: boolean;
    MAETAN: boolean;
  };
  roomType: {
    studio: boolean;
    twoThreeRoom: boolean;
    officetel: boolean;
    apartment: boolean;
  };
  floor: {};
}
