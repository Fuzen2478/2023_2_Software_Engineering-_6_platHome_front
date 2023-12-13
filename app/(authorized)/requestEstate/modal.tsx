"use client";

import { account_apis, estate_apis, request_apis, wishlist_apis } from "@/app/api/api";
import { useFilter } from "@/app/component/Filter";
import { IEstateStringConvert, IREQUESTEDEstate } from "@/app/component/interface";
import { useMyInfo, useRequestEstate } from "@/app/hook";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequestEstateModal() {
  const { showRequestEstateModal, setShowRequestEstateModal } = useRequestEstate();
  const [requestData, setRequestData] = useState<IREQUESTEDEstate>({
    context: "",
    location: "",
    roomType: "STUDIO",
    rentalType: "JEONSE",
    floor: "FIRST",
    deposit: 0,
    maintenanceFee: 0,
    monthlyRent: 0,
    squareFeet: 0,
    contractTerm: "",
    option: {
      elevator: false,
      park: false,
      cctv: false,
      doorLock: false,
      pet: false,
      veranda: false,
      refrigerator: false,
      sink: false,
      tv: false,
      internet: false,
      bed: false,
      desk: false,
      microwave: false,
      closet: false,
      shoeRack: false,
      bidet: false,
      interphone: false,
      parking: false,
      security: false,
      deilveryBox: false,
      BuildingEntrance: false,
      washingMachine: false,
      range: "FALSE",
      airConditioner: "FALSE",
    },
    images: [],
  });
  const router = useRouter();

  function Submit() {
    //check required
    if (requestData.location === "") {
      alert("주소를 입력해주세요");
      return false;
    } else if (requestData.contractTerm === "") {
      alert("계약만료일을 선택해주세요");
      return false;
    } else if (requestData.squareFeet === 0) {
      alert("평수를 입력해주세요");
      return false;
    } else if (requestData.deposit === 0) {
      alert("보증금을 입력해주세요");
      return false;
    } else if (requestData.maintenanceFee === 0) {
      alert("관리비를 입력해주세요");
      return false;
    } else if (requestData.monthlyRent === 0 && requestData.rentalType === "MONTHLY") {
      alert("월세를 입력해주세요");
      return false;
    } else {
      request_apis.post_form(requestData);
      setShowRequestEstateModal(false);
    }
  }

  return (
    <Modal
      isOpen={showRequestEstateModal}
      onOpenChange={setShowRequestEstateModal}
      className=" bg-neutral-800 border-4 border-primary-300"
    >
      <ModalContent>
        <ModalBody className="py-16">
          <div className="container flex flex-col gap-y-6 justify-center text-primary-400 font-bold">
            <p className="pb-8 text-center font-inter text-4xl font-normal">매물 등록요청하기</p>
            <form
              action={() => {
                Submit();
              }}
              onSubmit={() => {
                return false;
              }}
              className="flex flex-col gap-y-4 px-6"
            >
              <Input
                type="text"
                key="location"
                label="주소"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      location: e.target.value,
                    };
                  });
                }}
              />
              <Input
                type="text"
                label="설명글"
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      context: e.target.value,
                    };
                  });
                }}
              />
              <Select
                label="자취방 유형"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      roomType: e.target.value,
                    };
                  });
                }}
              >
                <SelectItem key="STUDIO" value="STUDIO">
                  원룸
                </SelectItem>
                <SelectItem key="TWO-THREEROOM" value="TWO-THREEROOM">
                  투쓰리룸
                </SelectItem>
                <SelectItem key="OFFICETEL" value="OFFICETEL">
                  오피스텔
                </SelectItem>
                <SelectItem key="APARTMENT" value="APARTMENT">
                  아파트
                </SelectItem>
              </Select>
              <Select
                label="계약 유형"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      rentalType: e.target.value,
                    };
                  });
                }}
              >
                <SelectItem key="JEONSE" value="JEONSE">
                  전세
                </SelectItem>
                <SelectItem key="MONTHLY" value="MONTHLY">
                  월세
                </SelectItem>
              </Select>
              <Select
                label="층수"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      floor: e.target.value,
                    };
                  });
                }}
              >
                <SelectItem key="FIRST" value="FIRST">
                  1층
                </SelectItem>
                <SelectItem key="SECOND" value="SECOND">
                  2층
                </SelectItem>
                <SelectItem key="THIRD" value="THIRD">
                  3층
                </SelectItem>
                <SelectItem key="FOURTH" value="FOURTH">
                  4층
                </SelectItem>
                <SelectItem key="FIFTH" value="FIFTH">
                  5층
                </SelectItem>
                <SelectItem key="SIXTH" value="SIXTH">
                  6층
                </SelectItem>
                <SelectItem key="SEVENTHUPPER" value="SEVENTHUPPER">
                  7층이상
                </SelectItem>
                <SelectItem key="TOP" value="TOP">
                  옥탑방
                </SelectItem>
                <SelectItem key="UNDER" value="UNDER">
                  반지하
                </SelectItem>
              </Select>
              <Input
                type="date"
                label="현재 계약만료일"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      contractTerm: e.target.value,
                    };
                  });
                }}
              />
              <Input
                type="number"
                label="평수(m^3)"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      squareFeet: e.target.value,
                    };
                  });
                }}
              />
              <Input
                type="number"
                label="보증금"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      deposit: e.target.value,
                    };
                  });
                }}
              />
              <Input
                type="number"
                label="관리비"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      maintenanceFee: e.target.value,
                    };
                  });
                }}
              />
              <Input
                type="number"
                label="월세"
                required
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      monthlyRent: e.target.value,
                    };
                  });
                }}
              />
              <label>옵션</label>
              <div className="flex gap-3 flex-wrap option">
                <Checkbox
                  color="primary"
                  value="elevator"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          elevator: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  엘레베이터
                </Checkbox>
                <Checkbox
                  value="park"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          park: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  공원
                </Checkbox>
                <Checkbox
                  value="cctv"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          cctv: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  cctv
                </Checkbox>
                <Checkbox
                  value="doorLock"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          doorLock: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  도어락
                </Checkbox>
                <Checkbox
                  value="pet"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          pet: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  애완동물
                </Checkbox>
                <Checkbox
                  value="veranda"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          veranda: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  베란다
                </Checkbox>
                <Checkbox
                  value="refrigerator"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          refrigerator: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  냉장고
                </Checkbox>
                <Checkbox
                  value="sink"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          sink: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  싱크대
                </Checkbox>
                <Checkbox
                  value="tv"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          tv: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  TV
                </Checkbox>
                <Checkbox
                  value="internet"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          internet: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  인터넷
                </Checkbox>
                <Checkbox
                  value="bed"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          bed: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  침대
                </Checkbox>
                <Checkbox
                  value="desk"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          desk: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  책상
                </Checkbox>
                <Checkbox
                  value="microwave"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          microwave: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  전자레인지
                </Checkbox>
                <Checkbox
                  value="closet"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          closet: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  옷장
                </Checkbox>
                <Checkbox
                  value="shoeRack"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          shoeRack: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  신발장
                </Checkbox>
                <Checkbox
                  value="bidet"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          bidet: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  비데
                </Checkbox>
                <Checkbox
                  value="interphone"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          interphone: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  인터폰
                </Checkbox>
                <Checkbox
                  value="parking"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          parking: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  주차
                </Checkbox>
                <Checkbox
                  value="security"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          security: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  경비
                </Checkbox>
                <Checkbox
                  value="deilveryBox"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          deilveryBox: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  택배함
                </Checkbox>
                <Checkbox
                  value="BuildingEntrance"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          BuildingEntrance: e.target.checked,
                        },
                      };
                    });
                  }}
                >
                  건물출입문
                </Checkbox>
                <Checkbox
                  value="washingMachine"
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          washingMachine: e.target.checked,
                        },
                      };
                    });
                  }}
                  color="primary"
                >
                  식기세척기
                </Checkbox>
                <Select
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          range: e.target.value,
                        },
                      };
                    });
                  }}
                  label="레인지"
                  size="sm"
                  className="basis-[48%]"
                >
                  <SelectItem key="GAS" value="GAS">
                    가스레인지
                  </SelectItem>
                  <SelectItem key="INDUCTION" value="INDUCTION">
                    인덕션
                  </SelectItem>
                  <SelectItem key="FALSE" value="FALSE">
                    없음
                  </SelectItem>
                </Select>
                <Select
                  onChange={(e) => {
                    setRequestData((prev: any) => {
                      return {
                        ...prev,
                        option: {
                          ...prev.option,
                          airConditioner: e.target.value,
                        },
                      };
                    });
                  }}
                  size="sm"
                  label="에어컨"
                  className="basis-[48%]"
                >
                  <SelectItem key="TOP" value="TOP">
                    천장형
                  </SelectItem>
                  <SelectItem key="WALL" value="WALL">
                    벽걸이형
                  </SelectItem>
                  <SelectItem key="STAND" value="STAND">
                    스탠드형
                  </SelectItem>
                  <SelectItem key="FALSE" value="FALSE">
                    없음
                  </SelectItem>
                </Select>
              </div>
              <Input
                type="image"
                label="계약서 사진(필수 아님)"
                onChange={(e) => {
                  setRequestData((prev: any) => {
                    return {
                      ...prev,
                      images: prev.images.concat(e.target.value),
                    };
                  });
                }}
              />
              <Button type="submit" color="primary" className="text-white">
                요청하기
              </Button>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
