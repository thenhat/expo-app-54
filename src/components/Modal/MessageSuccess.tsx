import DefaultModal, { DefaultModalProps } from "./DefaultModal";
import { Text, TouchableOpacity, View } from "react-native";
import MessageSuccessIcon from "@/assets/icons/message-success.svg";

interface Props extends DefaultModalProps {
  message: string;
  subMessage?: string;
  onAction?: () => void;
}

const MessageSuccessModal: React.FC<Props> = ({
  message,
  subMessage,
  visible,
  handleCloseModal,
  onAction,
}) => {
  return (
    <DefaultModal visible={visible} handleCloseModal={handleCloseModal}>
      <View className="justify-center w-full m-auto">
        <MessageSuccessIcon />
      </View>
      <Text className="mb-[10px] mt-[15px] text-[22px] leading-[28.6px] text-[#222222] text-center font-defaultSemiBold whitespace-pre-wrap">
        {message}
      </Text>
      {subMessage && (
        <Text className="text-[14px] mb-[20px] text-[#888] text-center font-defaultRegular whitespace-pre-wrap">
          {subMessage}
        </Text>
      )}
      {onAction && (
        <TouchableOpacity
          onPress={() => {
            onAction?.();
            handleCloseModal();
          }}
          className="h-[40px] mt-[10px] items-center justify-center w-fit px-[20px] rounded-full bg-[#2F265D]"
        >
          <Text className="text-[14px] text-[#fff] font-defaultBold">확인</Text>
        </TouchableOpacity>
      )}
    </DefaultModal>
  );
};

export default MessageSuccessModal;
