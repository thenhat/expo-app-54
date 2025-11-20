import { Text, TouchableOpacity } from "react-native";
import DefaultModal, { DefaultModalProps } from "../DefaultModal";

interface Props extends DefaultModalProps {
  onOk: () => void;
}

const RegisterSuccessModal: React.FC<Props> = ({
  visible,
  handleCloseModal,
  onOk,
}) => {
  return (
    <DefaultModal visible={visible} handleCloseModal={handleCloseModal}>
      <Text className="mb-[20px] text-[22px] leading-[28.6px] text-[#222222] text-center">
        회원가입 성공했습니다.
      </Text>
      <TouchableOpacity
        onPress={onOk}
        className="h-[40px] items-center justify-center w-fit px-[20px] rounded-full bg-[#2F265D]"
      >
        <Text className="text-[14px] text-[#fff] font-defaultBold">확인</Text>
      </TouchableOpacity>
    </DefaultModal>
  );
};

export default RegisterSuccessModal;
