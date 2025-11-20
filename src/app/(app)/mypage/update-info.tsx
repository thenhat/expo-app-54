import InputField from "@/components/InputField";
import CancelMemberModal from "@/components/Modal/CancelMember";
import ChangePasswordModal from "@/components/mypage/modal/ChangePassword";
import SwitchButton from "@/components/Switch";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import PageName from "@/constants/PageName";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/hooks/useAuth";
import useCountDown from "@/hooks/useCountDown";
import { useProfile } from "@/hooks/useProfile";
import sendApiRequest from "@/utils/api";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { Fragment, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UpdateInfoScreen() {
  const { setModal } = useModal();
  const router = useRouter();
  const { signOut } = useAuth();
  const { seconds, isRunning, start } = useCountDown(
    60,
    true,
    "updateInfoCountDown"
  );
  const { profile }: any = useProfile();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isChangePhone, setIsChangePhone] = useState<boolean>(false);
  const [isverifyOtp, setIsVerifyOtp] = useState<boolean>(false);
  const [openCancelMember, setOpenCancelMember] = useState<boolean>(false);
  // console.log("profile", profile);

  const handleCancelMember = async () => {
    try {
      const res: any = await sendApiRequest({
        method: "post",
        endPoint: "/me/leave",
      });
      if (res) {
        await signOut();
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("error:", error);
      setModal({ open: "error", message: "Failed!" });
    }
  };

  // const showAlertCancel = () => {
  //   Alert.alert(
  //     "회원 탈퇴 하시겠습니까?",
  //     "보유하고 있는 이용 기록 및 캐시, 포인트, 쿠폰은 모두 소멸됩니다.",
  //     [
  //       {
  //         text: "cancel",
  //         // onPress: () => console.log("cancel"),
  //         style: "cancel",
  //       },
  //       { text: "Ok", onPress: handleCancelMember },
  //     ]
  //   );
  // };

  const handleSubmitForm = async (values: any) => {
    // console.log("values", values);
    if (values.phoneNumber !== profile?.mobile && !isverifyOtp) {
      setModal({ open: "info", message: "Please verify OTP" });
      return;
    }
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.updateInfo,
        body: {
          fullName: values.name,
          mobile: values.phoneNumber,
          emailRcv: values.receiveEmail,
          smsRcv: values.receiveSms,
        },
      });
      if (res) {
        setModal({
          open: "success",
          message: "사용자 정보 업데이트가 완료되었습니다",
        });
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSendRequestOtp = async (phone: string) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.sendChangePasswodCode,
        body: {
          phone,
        },
      });
      if (res) {
        !isRunning && start();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSubmitOtp = async (code: string, phone: string) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.verifyChangePasswordCode,
        body: {
          code,
          phone,
        },
      });
      if (res) {
        console.log("OTP verified successfully");
        setModal({
          open: "success",
          message: "OTP verified, you can update phone number now",
        });
        setIsVerifyOtp(true);
      }
    } catch (error) {
      console.log("error:", error);
      setModal({
        open: "error",
        message: "OTP 인증 실패했습니다.",
      });
    }
  };

  return (
    <Fragment>
      <CancelMemberModal
        visible={openCancelMember}
        handleCloseModal={() => setOpenCancelMember(false)}
        message={
          "회원 탈퇴 하시겠습니까?\n\n보유하고 있는 이용 기록 및 캐시, 포인트, 쿠폰은 모두 소멸됩니다."
        }
        onAction={handleCancelMember}
      />
      <Wrapper headerType="BACK" headerScreenName={PageName.UPDATE_INFO}>
        <ScrollView>
          <View className="px-[16px] pt-[20px] flex-1">
            <Formik
              initialValues={{
                email: profile?.email || "",
                name: profile?.fullName || "",
                phoneNumber: profile?.mobile || "",
                otp: "",
                receiveEmail: profile?.termsAgree?.emailRcv || false,
                receiveSms: profile?.termsAgree?.smsRcv || false,
              }}
              enableReinitialize={true}
              onSubmit={handleSubmitForm}
              className="flex-1"
            >
              {({ handleChange, setFieldValue, handleSubmit, values }) => (
                <View className="flex-col flex-1">
                  <View className="flex-1">
                    {/* email ----------------- */}
                    <InputField
                      label="계정"
                      onChangeText={handleChange("email")}
                      value={values.email}
                      disabled={true}
                    />
                    {/* change password ------------------- */}
                    <TouchableOpacity onPress={() => setOpenModal(true)}>
                      <View className="flex items-center justify-center border border-[#2F265D] h-[50px] max-h-[50px] leading-[50px] rounded-full px-[20px] mb-[32px]">
                        <Text className="text-center text-[14px] font-defaultSemiBold">
                          비밀번호 변경
                        </Text>
                      </View>

                    </TouchableOpacity>
                    {/* name ----------------- */}
                    <InputField
                      label="이름"
                      onChangeText={handleChange("name")}
                      value={values.name}
                    // disabled={true}
                    />
                    {/* phone number ----------------- */}
                    <View className="flex-row items-end mt-[32px]">
                      <InputField
                        label="전화번호"
                        placeholder="전화번호 입력"
                        onChangeText={handleChange("phoneNumber")}
                        value={values.phoneNumber}
                        defaultValue={values.phoneNumber}
                        disabled={!isChangePhone}
                        containerClassName="flex-1 pr-[20px]"
                      />
                      {isChangePhone ? (
                        <TouchableOpacity
                          onPress={(e) =>
                            isRunning
                              ? e.preventDefault()
                              : handleSendRequestOtp(values.phoneNumber)
                          }
                        >
                          <View className={`flex items-center justify-center flex-1 text-center max-h-[50px] leading-[50px] border rounded-full w-[100px] ${isRunning ? "border-[#D8D8D8]" : "border-[#2F265D]"}`}>
                            <Text
                              className={`text-center text-[14px] font-defaultSemiBold ${isRunning ? "text-[#D8D8D8]" : "text-[#2F265D]"}`}
                            >
                              {isRunning ? seconds : "인증번호받기"}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            Keyboard.dismiss();
                            setIsChangePhone(true);
                          }}
                        >
                          <View className="flex items-center justify-center border border-[#2F265D] h-[50px] max-h-[50px] leading-[50px] rounded-full w-[100px]">
                            <Text className="text-center text-[14px] font-defaultSemiBold">
                              변경
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                    {isChangePhone && (
                      <View className="flex-row items-end mt-[12px]">
                        <InputField
                          placeholder="인증번호 입력"
                          onChangeText={handleChange("otp")}
                          value={values.otp}
                          defaultValue={values.otp}
                          disabled={!isChangePhone}
                          containerClassName="flex-1 pr-[20px]"
                        />
                        <TouchableOpacity
                          onPress={() =>
                            handleSubmitOtp(values.otp, values.phoneNumber)
                          }
                        >
                          <View className={`flex items-center justify-center flex-1 text-center max-h-[50px] leading-[50px] border rounded-full w-[100px] ${isverifyOtp ? "border-[#D8D8D8]" : "border-[#2F265D]"}`}>
                            <Text className={`text-center text-[14px] font-defaultSemiBold ${isverifyOtp ? "text-[#D8D8D8]" : "text-[#2F265D]"}`}
                            >
                              완료
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                    {/* receive emails ----------------- */}
                    <View className="mt-[32px] flex-row justify-between items-center">
                      <Text className="text-[14px] text-[#222222] leading-[25.2] font-defaultRegular mb-2">
                        메일수신동의
                      </Text>
                      <SwitchButton
                        isOn={values.receiveEmail}
                        onToggle={(isOn) => setFieldValue("receiveEmail", isOn)}
                      />
                    </View>
                    {/* receive SMS ----------------- */}
                    <View className="mt-[12px] flex-row justify-between items-center">
                      <Text className="text-[14px] text-[#222222] leading-[25.2] font-defaultRegular mb-2">
                        SMS 수신 동의
                      </Text>
                      <SwitchButton
                        isOn={values.receiveSms}
                        onToggle={(isOn) => setFieldValue("receiveSms", isOn)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => setOpenCancelMember(true)}
                      className="mt-[42px]"
                    >
                      <Text className="text-[14px] text-[#DF1519] leading-[18.2px] underline font-defaultSemiBold">
                        회원탈퇴
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    className="mt-[50px]"
                    onPress={() => handleSubmit()}
                  >
                    <View className="flex items-center justify-center bg-[#2F265D] h-[50px] max-h-[50px] leading-[50px] rounded-full px-[20px]">
                      <Text className="text-center text-[#fff] text-[14px] font-defaultSemiBold">
                        저장하기
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            <ChangePasswordModal
              visible={openModal}
              handleCloseModal={() => setOpenModal(false)}
            />
          </View>
        </ScrollView>
      </Wrapper>
    </Fragment>
  );
}

const styles = StyleSheet.create({});
