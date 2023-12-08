export interface IFilter {
  Area: {
    gwanggyo: boolean;
    ingyedong: boolean;
    uman: boolean;
    woncheon: boolean;
    maetan: boolean;
  };
  RoomType: {
    studio: boolean;
    "two-threeRoom": boolean;
    officetel: boolean;
    apartment: boolean;
  };
  RentType: { monthly: boolean; jeonse: boolean };
  Deposit: { min: number; max: number };
  MonthlyFee: { min: number; max: number }; //월세 + 관리비
  RoomSize: { min: number; max: number };
  floor: {
    first: boolean;
    second: boolean;
    third: boolean;
    fourth: boolean;
    fifth: boolean;
    sixth: boolean;
    seventhUpper: boolean;
    top: boolean; //옥탑방
    under: boolean; //반지하
  };
  option: {
    elevator: boolean;
    park: boolean;
    cctv: boolean;
    doorLock: boolean;
    pet: boolean;
    veranda: boolean;
    range: "induction" | "gas" | false;
    airConditioner: "top" | "wall" | "stand" | false;
    refrigerator: boolean;
    sink: boolean;
    tv: boolean;
    internet: boolean;
    bed: boolean;
    desk: boolean;
    microwave: boolean;
    closet: boolean;
    shoeRack: boolean;
    bidet: boolean;
    interphone: boolean;
    parking: boolean;
    security: boolean;
    deilveryBox: boolean;
    BuildingEntrance: boolean;
    washingMachine: boolean;
  };
}
