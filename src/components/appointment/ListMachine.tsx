import WashingIcon from "@/components/Icon/WashingIcon";
import DryerIcon from "@/components/Icon/DryerIcon";
import ShoesWashing from "@/components/Icon/ShoesWashing";
import ShoesDryCleaning from "@/components/Icon/ShoesDryCleaning";
import StylerIcon from "@/components/Icon/StylerIcon";

import formatNumbers from "@/utils/format";

import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { useProfile } from "@/hooks/useProfile";
import { useDispatch } from "react-redux";
import { useModal } from "@/contexts/ModalContext";
import { setLoading } from "@/store/slice/globalSlice";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import moment from "moment";

const cleaning = require("@/assets/images/cleaning.png");
const cleaningActive = require("@/assets/images/cleaning-active.png");
const dryCleaning = require("@/assets/images/dry-cleaning.png");
const dryCleaningActive = require("@/assets/images/dry-cleaning-active.png");

interface Props {
  dataMachine?: any;
  machineActive?: any;
  setMachineActive?: any;
  useTime?: any;
  useDate?: any;
}

export default function ListMachine({
  dataMachine,
  machineActive,
  setMachineActive,
  useTime,
  useDate,
}: Props) {
  const [isActive, setIsActive] = useState(0);
  const { type }: any = useLocalSearchParams<{ user: string }>();
  const isPayment = (type === "PAYMENT") || type === "DRYCLEANING";
  const { profile }: any = useProfile();
  const dispatch = useDispatch();
  const { setModal } = useModal();

  const currentCompareTime = isPayment ? new Date() : new Date(
    moment(useDate).format("YYYY-MM-DD") + " " + moment(useTime).format("HH:mm:ss")
  );

  useEffect(() => {
    if (machineActive?.id) {
      setIsActive(machineActive?.id);
    }
  }, [machineActive]);

  const handleChange = (value: any) => {
    if (setMachineActive) {
      setIsActive(value?.id);
      setMachineActive(value);
    }
  };

  const handleSendStart = async (oid: string) => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.reStartMachineByUser,
        body: { oid },
      });
      if (res?.success) {
        dispatch(setLoading(false));
        setModal({ open: "success", message: res?.message });
      }
      else {
        dispatch(setLoading(false));
        setModal({ open: "error", message: res?.message });
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      setModal({ open: "error", message: error?.response?.data?.message });
    }
  };

  const renderIcon = (item: any) => {
    if (type === "DRYCLEANING" || type === "DRY_BOOKING") {
      return (
        isActive === item?.id ?
          <View className="relative">
            <Image
              style={styles.imageIcon}
              source={item?.typeCode?.includes("DRYER_") ? dryCleaningActive : cleaningActive}
            />
            {
              item?.typeCode?.includes("WASHING_") &&
              <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#0A9EE8] text-[#fff] text-[10px] rounded-[5px]">
                {item.weight}KG
              </Text>
            }
            {
              item?.typeCode?.includes("DRYER_") &&
              <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#DF1519] text-[#fff] text-[10px] rounded-[5px]">
                {item.weight}KG
              </Text>
            }

          </View>

          :
          <View className="relative">
            <Image
              style={styles.imageIcon}
              source={item?.typeCode?.includes("DRYER_") ? dryCleaning : cleaning}
            />
            {
              item?.typeCode?.includes("WASHING_") &&
              <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#0A9EE8] text-[#fff] text-[10px] rounded-[5px]">
                {item.weight}KG
              </Text>
            }
            {
              item?.typeCode?.includes("DRYER_") &&
              <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#DF1519] text-[#fff] text-[10px] rounded-[5px]">
                {item.weight}KG
              </Text>
            }
          </View>

      );
    }
    switch (true) {
      case item?.typeCode?.includes("WASHING_"):
        return (
          <View className="relative">
            <WashingIcon
              stroke={isActive === item?.id ? "#2F265D" : "#888888"}
            />
            <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#0A9EE8] text-[#fff] text-[10px] rounded-[5px]">
              {item.weight}KG
            </Text>
          </View>
        );
      case item?.typeCode?.includes("DRYER_"):
        return (
          <View className="relative">
            <DryerIcon stroke={isActive === item?.id ? "#2F265D" : "#888888"} />
            <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#DF1519] text-[#fff] text-[10px] rounded-[5px]">
              {item.weight}KG
            </Text>
          </View>
        );
      case item?.typeCode?.includes("SHOE_WASHING"):
        return (
          <ShoesWashing
            stroke={isActive === item?.id ? "#2F265D" : "#888888"}
          />
        );
      case item?.typeCode?.includes("SHOE_DRY_CLEANING"):
        return (
          <ShoesDryCleaning
            stroke={isActive === item?.id ? "#2F265D" : "#888888"}
          />
        );
      case item?.typeCode?.includes("STYLER"):
        return (
          <StylerIcon stroke={isActive === item?.id ? "#2F265D" : "#888888"} />
        );
      default:
        return (
          <WashingIcon stroke={isActive === item?.id ? "#2F265D" : "#888888"} />
        );
    }
  };
  // console.log('dataMachine', dataMachine);

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.listMachine}>
      {dataMachine?.map((item: any, index: number) => {
        const isWashingItem = item?.typeCode.includes("WASHING_");
        const reStartItem = (
          (item?.state?.key === 2 || item?.state?.key === 3) &&
          item?.state?.userInfoOrder?.idUser === profile?.id &&
          currentCompareTime >= new Date(item?.state?.userInfoOrder?.startTime) &&
          currentCompareTime <= new Date(new Date(item?.state?.userInfoOrder?.startTime).getTime() + 5 * 60 * 1000)
        ); 
        
        const isInOrderTime = () => {
          const orderStartTime = new Date(item?.state?.userInfoOrder?.startTime);
          const orderEndTime = new Date(item?.state?.userInfoOrder?.endTime);
          return (
            orderStartTime < currentCompareTime && orderEndTime > currentCompareTime
          );
        }
        
        const isMe = item?.state?.userInfoOrder?.idUser === profile?.id || reStartItem;
        const lineUpItem = isPayment && item?.state?.key === 2 && !isMe;

        return (
          <Pressable
            style={[
              styles.itemMachine,
              styles.shadowProp,
              isActive === item?.id ? styles.itemMachineActive : {},
              isInOrderTime() ? styles.itemLineUpItem : {},
              !setMachineActive ? { backgroundColor: "#FFFFFF" } : {},
            ]}
            key={index}
            onPress={() => !isInOrderTime() && handleChange(item)}
          >
            {renderIcon(item)}
            <View>
              <Text style={styles.machineText}>{item?.name}</Text>
            </View>

            {isInOrderTime() &&
              <View className="absolute top-0 left-0 right-0 bottom-0 rounded-[15px] bg-[#FFFFFF80]"></View>
            }
            {lineUpItem ?
              ((!isMe && isWashingItem) ?
                <TouchableOpacity className="cursor-pointer z-40 w-[66px] h-[25px] bg-[#0A9EE8] flex items-center justify-center rounded-full"
                  onPress={() => handleChange(item)}
                >
                  <Text className="text-[#FFFFFF] text-[13px] font-montserrat600 leading-[20px]">
                    줄서기
                  </Text>

                </TouchableOpacity>
                :
                <TouchableOpacity className="cursor-pointer z-40 w-[66px] h-[25px]"
                  onPress={() => handleChange(item)}
                >
                </TouchableOpacity>
              )
              :
              !reStartItem &&
              <Text style={styles.priceText}>
                {formatNumbers((type === "DRYCLEANING" || type === "DRY_BOOKING") ? item?.priceWetCleaning : item?.price)}원~
              </Text>
            }
            {reStartItem &&
              <TouchableOpacity className="cursor-pointer z-40 w-[70px] h-[25px] bg-[#948aff] flex items-center justify-center rounded-full"
                onPress={() => handleSendStart(item?.state?.userInfoOrder?.oid)}
              >
                <Text className="text-[#FFFFFF] text-[13px] font-montserrat600 leading-[20px]">
                  시작재전송
                </Text>

              </TouchableOpacity>
            }
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 40,
    marginTop: 8,
  },
  imageIcon: {
    width: 50,
    height: 50
  },
  info: {
    backgroundColor: "#2F265D",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  titleText: {
    color: "#222222",
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 24.7,
  },
  desText: {
    color: "#FFFFFF",
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 19.5,
    marginTop: 4,
  },
  listMachine: {
    marginTop: 20,
    gap: 8,
    maxHeight: 348,
    paddingRight: 2,
    marginRight: -2,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  itemMachine: {
    flexDirection: "row",
    color: "#888888",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#0000001A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  itemMachineActive: {
    borderColor: "#2F265D",
    color: "#2F265D",
  },
  itemLineUpItem: {
    cursor: 'auto',
    backgroundColor: '#FFFFFF80'
  },
  machineText: {
    fontWeight: "500",
    color: "#222222",
    fontSize: 14,
  },
  textLineUp: {
    fontWeight: "500",
    color: "#F33571",
    fontSize: 12,
    marginTop: 5
  },
  priceText: {
    color: "#06C164",
    fontWeight: "700",
    fontSize: 18,
  },
});
