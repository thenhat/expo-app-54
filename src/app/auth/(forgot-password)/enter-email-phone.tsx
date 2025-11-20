import Button from "@/components/Button";
import Input from "@/components/Input";
import InputField from "@/components/InputField";
import FogotPasswordModal from "@/components/Modal/FogotPasswordModal";
import { apiConfig } from "@/constants/apiConfig";
import { useModal } from "@/contexts/ModalContext";
import useCountDown from "@/hooks/useCountDown";
import sendApiRequest from "@/utils/api";
import { convertSecondToMinutes } from "@/utils/format";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  otp: Yup.string().required("Opt is required"),
});

const EnterEmailPhone: React.FC = () => {
  const { setModal } = useModal();
  const { seconds, isRunning, start } = useCountDown(
    180,
    true,
    "forgotPasswordCountDown"
  );
  const [isverifyOtp, setIsVerifyOtp] = useState<boolean>(false);

  const handleSendRequestOtp = async (phone: string) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.sendFindPasswordCode,
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
        ...apiConfig.auth.verifyFindPasswordCode,
        body: {
          code,
          mobile: phone,
        },
      });
      if (res) {
        console.log("OTP verified successfully");
        setModal({ open: "success", message: "OTP verified successfully" });
        setIsVerifyOtp(true);
      }
    } catch (error) {
      console.log("error:", error);
      setModal({ open: "error", message: "OTP 인증 실패했습니다." });
    }
  };

  const handleSubmitForm = async (values: any) => {
    const userData = {
      email: values.email,
      phoneNumber: values.phoneNumber,
    };
    await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
    isverifyOtp && router.push("/auth/(forgot-password)/enter-new-password");
  };

  return (
    <View className="flex-1">
      <Formik
        initialValues={{
          email: "",
          phoneNumber: "",
          otp: "",
        }}
        onSubmit={handleSubmitForm}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View className="px-[16px] py-[40px] flex-1">
            <ScrollView>
              <View>
                {/* email */}
                <View>
                  <InputField
                    label="이메일주소(ID)"
                    placeholder="@포함 정확하게 입력해주세요."
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    touched={touched.email}
                    errors={errors.email}
                  />
                </View>
                {/*phonenumber - otp */}
                <View className="mt-[32px]">
                  <Text className="text-[#222222] text-[14px] leading-[18.2px] font-defaultRegular mb-[5px]">
                    회원가입시 인증한 휴대폰 번호를 입력해주세요.
                  </Text>
                  <View className="flex-row items-start">
                    <InputField
                      // label="전화번호"
                      placeholder="전화번호 입력"
                      onChangeText={handleChange("phoneNumber")}
                      value={values.phoneNumber}
                      defaultValue={values.phoneNumber}
                      containerClassName="flex-1 pr-[20px]"
                      touched={touched.phoneNumber}
                      errors={errors.phoneNumber}
                    />
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
                          {isRunning
                            ? convertSecondToMinutes(seconds)
                            : "인증번호받기"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row items-start mt-[12px]">
                    <InputField
                      placeholder="인증번호 입력"
                      onChangeText={handleChange("otp")}
                      value={values.otp}
                      defaultValue={values.otp}
                      containerClassName="flex-1 pr-[20px]"
                      touched={touched.otp}
                      errors={errors.otp}
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
                </View>
              </View>
            </ScrollView>
            <View className="mt-auto">
              <Button
                disabled={!isverifyOtp}
                onPress={handleSubmit}
                label="비밀번호 재설정"
                mode="contained"
                color="primary"
                styleButton={{ width: "100%", marginTop: 8 }}
              />
            </View>
          </View>
        )}
      </Formik>

      {/* <FogotPasswordModal
        isError={true}
        visible={true}
        handleCloseModal={() => {}}
        handleSuccess={() => router.push("/auth/login")}
      /> */}

      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "auto"}
        backgroundColor="#2F265D"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EnterEmailPhone;
