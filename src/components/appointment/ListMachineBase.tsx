import WashingIcon from "@/components/Icon/WashingIcon";
import DryerIcon from "@/components/Icon/DryerIcon";
import ShoesWashing from "@/components/Icon/ShoesWashing";
import ShoesDryCleaning from "@/components/Icon/ShoesDryCleaning";
import StylerIcon from "@/components/Icon/StylerIcon";
import formatNumbers from "@/utils/format";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";

const cleaning = require("@/assets/images/cleaning.png");
const dryCleaning = require("@/assets/images/dry-cleaning.png");

interface Props {
  dataMachine?: any;
  machineActive?: any;
  setMachineActive?: any;
  useTime?: any;
  useDate?: any;
}

export default function ListMachineBase({
  dataMachine,
}: Props) {
  const { type }: any = useLocalSearchParams<{ user: string }>();

  const renderIcon = (item: any) => {
    if (type === "DRYCLEANING" || type === "DRY_BOOKING") {
      return (
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
              stroke={"#888888"}
            />
            <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#0A9EE8] text-[#fff] text-[10px] rounded-[5px]">
              {item.weight}KG
            </Text>
          </View>
        );
      case item?.typeCode?.includes("DRYER_"):
        return (
          <View className="relative">
            <DryerIcon stroke={"#888888"} />
            <Text className="absolute bottom-[-5px] right-[-5px] font-defaultBold w-[38px] h-[20px] text-center leading-[20px] bg-[#DF1519] text-[#fff] text-[10px] rounded-[5px]">
              {item.weight}KG
            </Text>
          </View>
        );
      case item?.typeCode?.includes("SHOE_WASHING"):
        return (
          <ShoesWashing
            stroke={"#888888"}
          />
        );
      case item?.typeCode?.includes("SHOE_DRY_CLEANING"):
        return (
          <ShoesDryCleaning
            stroke={"#888888"}
          />
        );
      case item?.typeCode?.includes("STYLER"):
        return (
          <StylerIcon stroke={"#888888"} />
        );
      default:
        return (
          <WashingIcon stroke={"#888888"} />
        );
    }
  };

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.listMachine}>
      {dataMachine?.map((item: any, index: number) => {
        return (
          <Pressable
            style={[
              styles.itemMachine,
              styles.shadowProp,
              { backgroundColor: "#FFFFFF" }
            ]}
            key={index}
          >
            {renderIcon(item)}
            <View>
              <Text style={styles.machineText}>{item?.name}</Text>
            </View>

            <Text style={styles.priceText}>
              {formatNumbers((type === "DRYCLEANING" || type === "DRY_BOOKING") ? item?.priceWetCleaning : item?.price)}원~
            </Text>
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
