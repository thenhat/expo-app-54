import XIcon from "@/assets/icons/my/x.svg";
import { useRouter } from "expo-router";
import {
  Image,
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { useModal } from "@/contexts/ModalContext";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
const DryBooking = require("@/assets/images/dry-booking.png");
const WashingBooking = require("@/assets/images/washing-booking.png");

interface Props extends ModalProps {
  handleCloseModal: () => void;
}

const ChooseBooking: React.FC<Props> = ({
  handleCloseModal,
  ...props
}) => {
  const { setModal } = useModal();
  const router = useRouter();
  const storeActive = useSelector((state: any) => state.store.storeActive);

  const handleUpdatePassword = async (value: any) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.updatePassword,
        body: {
          password: value.oldPassword,
          newPassword: value.newPassword,
          confirmNewPassword: value.confirmNewPassword,
        },
      });
      if (res) {
        setModal({ open: "success", message: "비밀번호 변경 성공했습니다." });
      }
    } catch (error) {
      console.error("error:", error);
      setModal({ open: "error", message: "비밀번호 변경 실패했습니다." });
    }
  };

  return (
    <Modal animationType="slide" transparent={true} {...props}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View className="relative w-full">
                <Text className="leading-[29.9px] text-[23px] font-defaultSemiBold text-center">
                  예약
                </Text>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  className="top-[2px] absolute right-[0]"
                >
                  <XIcon />
                </TouchableOpacity>
              </View>

              <View className="w-full mt-6">
                <View style={{ display: 'flex', flexDirection: 'row', gap: 15, paddingHorizontal: 4, marginBottom: 5 }}>
                  <View className="flex-1 text-center">
                    <TouchableOpacity className="bg-white aspect-square flex justify-center items-center border-none"
                      style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 5,
                        borderRadius: 16
                      }}
                      onPress={() => router.push("/appointment?type=BOOKING")}
                    >
                      <Image source={WashingBooking} alt="icon" className="h-[63%]" resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <Text className="text-[14px] font-montserrat600 text-[#2F265D] mt-3 mb-5 text-center">일반세탁</Text>
                  </View>
                  <View className="flex-1 text-center">
                    <TouchableOpacity className={cn("bg-[#DADADA] aspect-square flex justify-center items-center cursor-not-allowed border-none",
                      { 'bg-[#FFFFFF] cursor-pointer': storeActive?.wetCleaning }
                    )}
                      style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 5,
                        borderRadius: 16
                      }}
                      disabled={!storeActive?.wetCleaning}
                      onPress={() => router.push("/appointment?type=DRY_BOOKING")}
                    >
                      <Image source={DryBooking} alt="icon" className="h-[65%]" resizeMode={'contain'} />
                    </TouchableOpacity>
                    <Text className="text-[14px] font-montserrat600 text-[#2F265D] mt-3 mb-5 text-center">드라이클리닝</Text>
                  </View>
                </View>

                <TouchableOpacity onPress={() => router.push("/mypage/usage-history")}>
                  <Text className="text-center h-[50px] max-h-[50px] leading-[50px] border-solid border border-[#2F265D] bg-transparent text-[#2F265D] rounded-full text-[14px] font-defaultSemiBold">
                    예약내역
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(47, 38, 93, 0.85)",
  },
  modalContent: {
    backgroundColor: "white",
    // borderRadius: 10,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 23,
    // fontWeight: "bold",
    fontFamily: "montserrat600",
    lineHeight: 29.9,
  },
});

export default ChooseBooking;
