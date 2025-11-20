import DefaultModal, { DefaultModalProps } from "./DefaultModal";
import { Text, TouchableOpacity } from "react-native";

interface Props extends DefaultModalProps {
  message: string;
}

const MessageInfoModal: React.FC<Props> = ({
  message,
  visible,
  handleCloseModal,
}) => {
  return (
    <DefaultModal visible={visible} handleCloseModal={handleCloseModal}>
      <Text className="mb-[20px] text-[22px] leading-[28.6px] text-[#222222] text-center whitespace-pre-wrap font-defaultSemiBold">
        {message}
      </Text>
      <TouchableOpacity
        onPress={handleCloseModal}
        className="h-[40px] items-center justify-center w-fit px-[20px] rounded-full bg-[#2F265D]"
      >
        <Text className="text-[14px] text-[#fff] font-defaultBold">확인</Text>
      </TouchableOpacity>
    </DefaultModal>
  );
};

export default MessageInfoModal;
