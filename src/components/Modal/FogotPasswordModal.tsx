import DefaultModal, { DefaultModalProps } from "./DefaultModal";
import { Text, TouchableOpacity } from "react-native";

interface Props extends DefaultModalProps {
  isError: boolean;
  handleSuccess?: () => void;
}

const FogotPasswordModal: React.FC<Props> = ({
  handleCloseModal,
  handleSuccess,
  visible,
  isError,
}) => {
  return (
    <DefaultModal visible={visible} handleCloseModal={handleCloseModal}>
      <Text className="mb-[20px] text-[22px] leading-[28.6px] text-[#222222] text-center">
        {isError
          ? "입력한 정보로 확인되는 \n 계정이 없습니다. \n\n 다시 확인해주세요."
          : "비밀번호 변경이 완료 되었습니다."}
      </Text>
      {isError ? (
        <TouchableOpacity
          onPress={handleCloseModal}
          className="h-[40px] items-center justify-center w-fit px-[20px] rounded-full bg-[#2F265D]"
        >
          <Text className="text-[14px] text-[#fff] font-defaultBold">확인</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleSuccess}
          className="h-[40px] items-center justify-center w-fit px-[20px] rounded-full bg-[#2F265D]"
        >
          <Text className="text-[14px] text-[#fff] font-defaultBold">
            로그인하기
          </Text>
        </TouchableOpacity>
      )}
    </DefaultModal>
  );
};

export default FogotPasswordModal;
