import CIcon from "@/assets/icons/my/C-Violet-20.svg";
import PIcon from "@/assets/icons/my/P-Violet-20.svg";
import { Text, View } from "react-native";

interface Props {
  amount?: string;
  type: "CASH" | "POINT" | "COUPON" | "REVIEW";
  qty?: string;
  label: string;
}

const AmountTop: React.FC<Props> = ({
  amount = "0",
  qty = "0",
  type,
  label,
}) => {
  const renderTemplateTop = () => {
    switch (type) {
      case "CASH":
        return (
          <View className="flex-row items-center gap-[8px]">
            <Text className="text-[22px] font-defaultSemiBold text-[#2F265D]">
              {amount}
            </Text>
            <CIcon />
          </View>
        );
      case "POINT":
        return (
          <View className="flex-row items-center gap-[8px]">
            <Text className="text-[22px] font-defaultSemiBold text-[#2F265D]">
              {`${amount}`}
            </Text>
            <PIcon />
          </View>
        );
      case "COUPON":
        return (
          <Text className="text-[22px] font-defaultSemiBold text-[#2F265D]">
            {`${qty}장`}
          </Text>
        );
      case "REVIEW":
        return (
          <Text className="text-[22px] font-defaultSemiBold text-[#2F265D]">
            {`${qty}개`}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-row justify-between px-[15px] bg-[#EEEBFE] rounded-[10px] h-[61px] items-center">
      <Text className="text-[15px] font-defaultRegular text-[#6A6A6A]">
        {label}
      </Text>
      {renderTemplateTop()}
    </View>
  );
};

export default AmountTop;
