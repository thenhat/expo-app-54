import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import SelectPriceBox from "@/components/SelectPriceBox";
import Button from "@/components/Button";
import { Href, Link, useLocalSearchParams, useRouter } from "expo-router";
import Checkbox from "../Checkbox";
import MinusIcon from "@/components/Icon/MinusIcon";
import PlusSquareIcon from "@/components/Icon/PlusSquareIcon";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import formatNumbers from "@/utils/format";
import WashingIcon from "@/components/Icon/WashingIcon";
import DryerIcon from "@/components/Icon/DryerIcon";
import ShoesWashing from "@/components/Icon/ShoesWashing";
import ShoesDryCleaning from "@/components/Icon/ShoesDryCleaning";
import StylerIcon from "@/components/Icon/StylerIcon";
import { convertToDay } from "@/utils/dateCalculator";
import moment from "moment";

const cleaning = require("@/assets/images/cleaning.png");
const cleaningActive = require("@/assets/images/cleaning-active.png");
const dryCleaningActive = require("@/assets/images/dry-cleaning-active.png");

interface Props {
  dataMachine?: any;
  machineActive?: any;
  priceMachine?: any;
  setPriceMachine?: any;
  mode?: any;
  setMode?: any;
  style?: any;
  setStyle?: any;
  isLineup?: boolean;
  onCreate?: () => void;
  startDate?: string;
  endDate?: string;
  setIsModalVisibleLaudry?: any;
}

export default function LaundryOptions({ dataMachine, machineActive, priceMachine, setPriceMachine, onCreate, mode, setMode, style, setStyle, isLineup, startDate, endDate, setIsModalVisibleLaudry }: Props) {
  const [modes, setModes] = useState<any>([]);
  const router = useRouter();
  const { type }: any = useLocalSearchParams<{ user: string }>();
  const isDryCleaning = (type === "DRYCLEANING") || (type === "DRY_BOOKING");

  const timeText =
    convertToDay(startDate) +
    " - " +
    moment(endDate).format("HH:mm");

  const renderIcon = (item: any) => {
    if (type === "DRYCLEANING" || type === "DRY_BOOKING") {
      return (
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
      );
    }
    switch (true) {
      case item?.typeCode?.includes("WASHING_"):
        return (
          <View className="relative">
            <WashingIcon
              stroke={"#2F265D"}
            />
            <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#0A9EE8] text-[#fff] text-[10px] rounded-[5px]">
              {item.weight}KG
            </Text>
          </View>
        );
      case item?.typeCode?.includes("DRYER_"):
        return (
          <View className="relative">
            <DryerIcon stroke={"#2F265D"} />
            <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#DF1519] text-[#fff] text-[10px] rounded-[5px]">
              {item.weight}KG
            </Text>
          </View>
        );
      case item?.typeCode?.includes("SHOE_WASHING"):
        return (
          <ShoesWashing
            stroke={"#2F265D"}
          />
        );
      case item?.typeCode?.includes("SHOE_DRY_CLEANING"):
        return (
          <ShoesDryCleaning
            stroke={"#2F265D"}
          />
        );
      case item?.typeCode?.includes("STYLER"):
        return (
          <StylerIcon stroke={"#2F265D"} />
        );
      default:
        return (
          <WashingIcon stroke={"#2F265D"} />
        );
    }
  };

  useEffect(() => {
    const convertDataMachine = () => {
      if (dataMachine?.length > 0) {
        const machineData = machineActive;
        const isPaymentOrDryCleaning = type === "PAYMENT" || type === "DRYCLEANING";
        const convertedModes = machineData?.modes
          ?.map((item: any) => ({
            value: item.key,
            label: item.title,
            price: item.price,
          }))
          ?.filter((mode: any) => {
            // Include DRUM_WASHING only for PAYMENT or DRYCLEANING
            if (mode.value === "DRUM_WASHING") {
              return isPaymentOrDryCleaning;
            }
            // Existing filter logic
            return isDryCleaning ? mode.value?.includes("WET_CLEANING") : !mode.value?.includes("WET_CLEANING");
          }) || [];

        if (convertedModes.length > 0) {
          setModes(convertedModes);
          changeOption("mode", convertedModes[0]);
        }
      }
    };

    convertDataMachine();
  }, [dataMachine, machineActive, type]);

  useEffect(() => {
    if (machineActive?.id && mode?.value) {
      requestMachineData()
    }
    console.log('style', style);

  }, [style]);

  const requestMachineData = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.store.calculatorPriceMachine,
        body: {
          idMachine: machineActive?.id,
          washingMode: mode?.value,
          options: style
        },
      });

      if (res) {
        setPriceMachine(res);
      }
    } catch (error) {
      console.log("Api failed:", error);
    }
  };

  const changeOption = (type: string, e: any) => {
    switch (type) {
      case "mode":
        setMode(e);
        if (e.value === "DIRECT_SETTING") {
          setStyle([
            { key: "TIMES_DRYER", count: 1, title: "3분 수동 추가(+3분)" },
          ]);
        } else if (e.value === "SHOE_DRYER_DIRECT_SETTING") {
          setStyle([
            { key: "TIMES_SHOE_DRYER", count: 1, title: "6분 추가 건조(+6분)" },
          ]);
        } else if (e.value === "DRUM_WASHING") {
          setStyle([]);
        } else {
          setStyle([]);
        }
        break;
      case "style":
        if (e.max_count > 1) {
          e = { key: e.key, count: 1, title: e.title };
        } else {
          e = { key: e.key, count: e.max_count, title: e.title };
        }

        let check = style.findIndex((o: any) => o.key === e.key);

        if (check === -1) {
          setStyle([...style, e]);
        } else {
          setStyle(style.filter((o: any) => o.key !== e.key));
        }
        break;
    };
  };

  const prevClick = (item: any) => {
    let count = style.find((el: any) => el.key === item.key).count - 1;
    if (count >= 1) {
      setStyle(
        style.map((o: any) => (o.key === item.key ? { ...o, count } : o))
      );
    }
  };

  const nextClick = (item: any) => {
    let count = style.find((el: any) => el.key === item.key).count + 1;
    if (count <= item.max_count)
      setStyle(
        style.map((o: any) => (o.key === item.key ? { ...o, count } : o))
      );
  };

  function shouldDisplayCheckbox(key: string, option?: string): boolean {
    return !((
      key === "LOW_TEMPERATURE_DRYER" ||
      key === "MEDIUM_TEMPERATURE_DRYER" ||
      key === "SHOE_DRYER_2_3_PAIR" ||
      key === "SHOE_DRYER_3_4_PAIR" ||
      key === "SHOE_DRYER_4_5_PAIR"
    ) && (
        option === 'TIMES_DRYER' ||
        option === 'TIMES_SHOE_DRYER'
      ));
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.itemMachine,
          styles.shadowProp,
          { backgroundColor: "#FFFFFF" },
        ]}
      >
        {renderIcon(machineActive)}
        <View>
          <Text style={styles.machineText1}>{machineActive?.name}</Text>
          <Text style={styles.machineText2}>{timeText}</Text>
        </View>
        <Text style={styles.priceText}>
          {formatNumbers((type === "DRYCLEANING" || type === "DRY_BOOKING") ? machineActive?.priceWetCleaning : machineActive?.price)}원~
        </Text>
      </Pressable>
      <View style={[styles.content]}>
        <SelectPriceBox
          value={mode}
          options={modes}
          mode="none"
          border
          onSelect={(e: any) => changeOption("mode", e)}
          zIndex={11}
        />

        <View style={{ marginVertical: 15 }}>
          {mode?.value !== 'WET_CLEANING_DRY' && mode?.value !== 'DRUM_WASHING' && machineActive?.options?.map((item: any) => (
            shouldDisplayCheckbox(mode.value, item.key) && (
              <View key={item.key} style={styles.addRinseCycleWp}>
                <Checkbox
                  label={item.title}
                  checked={
                    item.key !== "TIMES_DRYER" &&
                      item.key !== "TIMES_SHOE_DRYER"
                      ? style.some((el: any) => el.key === item.key)
                      : true
                  }
                  onPress={() =>
                    item.key !== "TIMES_DRYER" &&
                    item.key !== "TIMES_SHOE_DRYER" &&
                    changeOption("style", item)
                  }
                />
                {item.max_count > 1 &&
                  style.some((el: any) => el.key === item.key) && (
                    <View style={styles.addRinseCycle}>
                      <Pressable disabled={style.find((el: any) => el.key === item.key).count <= 1} onPress={() => prevClick(item)}>
                        <MinusIcon stroke={style.find((el: any) => el.key === item.key).count <= 1 ? '#888888' : '#222222'} />
                      </Pressable>
                      <Text style={styles.textRinse}>{style.find((el: any) => el.key === item.key).count}</Text>
                      <Pressable disabled={style.find((el: any) => el.key === item.key).count >= item.max_count} onPress={() => nextClick(item)}>
                        <PlusSquareIcon stroke={style.find((el: any) => el.key === item.key).count >= item.max_count ? '#888888' : '#222222'} />
                      </Pressable>
                    </View>
                  )}
              </View>
            )))}
        </View>


        <View style={styles.addRinseCycleWp}>
          <Text style={styles.textPayment}>총 예상시간</Text>
          <Text style={styles.textPayment}>{priceMachine?.timeWash}분</Text>
        </View>

        <View style={styles.addRinseCycleWp}>
          <Text style={styles.textPayment}>총 상품 금액</Text>
          <Text style={styles.textPayment2}>{formatNumbers(priceMachine?.priceMachine)}원</Text>
        </View>
        {machineActive?.typeCode?.includes('WASHING_') &&
          <Pressable style={styles.noticeWp} onPress={() => {
            router.push({
              pathname: '/guide',
              params: { cleaning: isDryCleaning ? 'true' : 'false' }
            });
            setIsModalVisibleLaudry(false)
          }}>
            <Text style={styles.textNotice}>{isDryCleaning ? '드라이세탁 사용 주의사항' : '세탁기 사용시 주의사항'}</Text>
          </Pressable>
        }
        {machineActive?.typeCode?.includes('DRYER_') &&
          <Pressable style={styles.noticeWp} onPress={() => {
            router.push({
              pathname: '/guide-dry',
              params: { cleaning: isDryCleaning ? 'true' : 'false' }
            });
            setIsModalVisibleLaudry(false)
          }}>
            <Text style={styles.textNotice}>{isDryCleaning ? '드라이건조 사용 주의사항' : '건조기 사용시 주의사항'}</Text>
          </Pressable>
        }
      </View>


      <Button
        label={isLineup ? "줄서기" : "다음"}
        size="large"
        mode="contained"
        styleButton={{ width: "100%" }}
        color="primary"
        onPress={onCreate}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginTop: 8,
    width: '100%'
  },

  titleText: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  content: {
    marginTop: 15,
    marginBottom: 30,
    zIndex: 1,
  },
  noticeWp: {
    marginTop: 24,
  },
  textNotice: {
    color: "#f1493f",
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  desText: {
    color: "#FFFFFF",
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19.5,
    marginTop: 4,
  },
  listMachine: {
    marginTop: 20,
    gap: 8,
  },
  imageIcon: {
    width: 50,
    height: 50
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
    paddingHorizontal: 15,
  },
  itemMachineActive: {
    borderColor: "#2F265D",
    color: "#2F265D",
  },
  machineText: {
    fontWeight: '500',
    color: "#222222",
    fontSize: 14,
  },
  machineText1: {
    fontWeight: '500',
    color: "#2F265D",
    fontSize: 16,
  },
  machineText2: {
    fontWeight: '400',
    color: "#888888",
    fontSize: 14,
  },
  priceText: {
    color: "#06C164",
    fontWeight: '700',
    fontSize: 18,
  },
  addRinseCycleWp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5
  },
  addRinseCycle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  textRinse: {
    color: "#222222",
    fontWeight: '500',
    fontSize: 16,
    width: 20,
    textAlign: 'center'
  },
  textPayment: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 14,
  },
  textPayment2: {
    color: "#06C164",
    fontWeight: '600',
    fontSize: 20,
  },
});
