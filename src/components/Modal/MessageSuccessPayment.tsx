import DefaultModal, { DefaultModalProps } from "./DefaultModal";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
const Payment_Success = require("@/assets/images/payment-success.png");

interface Props extends DefaultModalProps {
  message: string;
  onAction?: () => void;
}

const MessageSuccessPayment: React.FC<Props> = ({
  visible,
  handleCloseModal,
  onAction,
}) => {
  return (
    <DefaultModal visible={visible} handleCloseModal={handleCloseModal}>
      <View className="justify-center w-full m-auto">
        <Image source={Payment_Success} />
      </View>
      <Text className="mb-[20px] mt-[5px] text-[24px] leading-[30px] text-[#8879DE] text-center font-defaultSemiBold whitespace-pre-wrap">
        결제완료
      </Text>
        <TouchableOpacity
          onPress={() => {
            handleCloseModal();
            onAction?.();
          }}
          className="h-[40px] items-center justify-center w-fit px-[20px] rounded-full bg-[#2F265D]"
        >
          <Text className="text-[14px] text-[#fff] font-defaultBold">예약내역 확인</Text>
        </TouchableOpacity>
    </DefaultModal>
  );
};

export default MessageSuccessPayment;
