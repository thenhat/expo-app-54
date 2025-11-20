import DefaultModal, { DefaultModalProps } from "./DefaultModal";
import { Text, TouchableOpacity, View } from "react-native";
import MessageSuccessIcon from "@/assets/icons/message-success.svg";

interface Props extends DefaultModalProps {
  message: string;
  onAction: () => void;
}

const CancelMemberModal: React.FC<Props> = ({
  message,
  visible,
  handleCloseModal,
  onAction,
}) => {
  return (
    <DefaultModal visible={visible} handleCloseModal={handleCloseModal}>
      {/* <View className="justify-center w-full m-auto">
        <MessageSuccessIcon />
      </View> */}
      <Text className="mb-[20px] mt-[15px] text-[22px] leading-[28.6px] text-[#222222] text-center whitespace-pre-wrap font-defaultSemiBold">
        {message}
      </Text>
      <View className="w-full flex-row justify-center space-x-4">
        <TouchableOpacity
          onPress={() => {
            handleCloseModal();
          }}
          className="h-[40px] items-center justify-center w-fit min-w-[120px] px-[20px] rounded-full border-[#2F265D] border-solid border text-[#2F265D]"
        >
          <Text className="text-[14px] text-[#2F265D] font-defaultBold">
            취소
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onAction();
            handleCloseModal();
          }}
          className="h-[40px] items-center justify-center w-fit min-w-[120px] px-[20px] rounded-full bg-[#2F265D]"
        >
          <Text className="text-[14px] text-[#fff] font-defaultBold">확인</Text>
        </TouchableOpacity>
      </View>
    </DefaultModal>
  );
};

export default CancelMemberModal;
