import CIcon from "@/assets/icons/my/C-Violet-20.svg";
import PIcon from "@/assets/icons/my/P-Violet-20.svg";
import moment from "moment";
import { Text, View } from "react-native";

export type ItemType = {
  amount?: number;
  type: "CASH" | "POINT" | "COUPON";
  historyDetail?: string;
  startTime: string;
  endTime?: string;
  expiryTime?: string;
  percent?: string;
  status?: "INCREASE" | "DECREASE";
  isExpired?: "UESED" | "EXPIRED";
  name?: string;
};

interface Props {
  item: ItemType;
}

const statusMapping: any = {
  UESED: (
    <Text className="text-[13px] font-defaultRegular leading-[20.8px] text-[#0A9EE8]">
      쿠폰사용완료
    </Text>
  ),
  EXPIRED: (
    <Text className="text-[13px] font-defaultRegular leading-[20.8px] text-[#DF1519]">
      기간만료
    </Text>
  ),
};

const CashPointItem: React.FC<Props> = ({ item }) => {
  const {
    amount = 0,
    type,
    historyDetail,
    startTime,
    endTime,
    expiryTime,
    percent,
    status,
    isExpired,
    name
  } = item;
  const renderTemplateTop = () => {
    switch (type) {
      case "CASH":
        return (
          <View className="flex-row items-center gap-[4px]">
            <Text className="text-[19px] leading-[24.7px] text-[#222222] font-defaultSemiBold">
              {amount}
            </Text>
            <CIcon style={{ width: 16, height: 16 }} />
          </View>
        );
      case "POINT":
        return (
          <View className="flex-row items-center gap-[4px]">
            <Text className="text-[19px] leading-[24.7px] text-[#222222] font-defaultSemiBold">
              {`${amount}`}
            </Text>
            <PIcon style={{ width: 16, height: 16 }} />
          </View>
        );
      case "COUPON":
        return (
          <Text className="text-[19px] leading-[24.7px] text-[#222222] font-defaultSemiBold">
            {name}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View className="py-[24px]">
      {renderTemplateTop()}
      {historyDetail && (
        <Text className="mt-[4px] text-[15px] leading-[27px] font-defaultRegular text-[#222]">
          {historyDetail}
        </Text>
      )}
      <View className="mt-[4px] flex-row justify-between items-center">
        <Text className="text-[13px] leading-[20.8px] text-[#888] font-defaultRegular">
          {startTime}
        </Text>
        {status === "INCREASE" && expiryTime && (
          <Text className="text-[13px] leading-[20.8px] text-[#888] font-defaultRegular">
            {expiryTime}
          </Text>
        )}
        {type === "COUPON" &&
          status === "DECREASE" &&
          statusMapping[isExpired ?? "EXPIRED"]}
        {type === "COUPON" &&
          status === "INCREASE" &&
          <Text className="text-[13px] leading-[20.8px] text-[#888] font-defaultRegular">
            {endTime} 까지
          </Text>
        }
      </View>
    </View>
  );
};

export default CashPointItem;
