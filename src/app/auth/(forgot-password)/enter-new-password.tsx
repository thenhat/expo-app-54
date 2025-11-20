import InputField from "@/components/InputField";
import FogotPasswordModal from "@/components/Modal/FogotPasswordModal";
import { apiConfig } from "@/constants/apiConfig";
import sendApiRequest from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
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
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "비밀번호는 8자이상 영문+숫자+특수문자 모두 포함되야 합니다."
    )
    .required("정보를 입력해주세요."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다")
    .required("정보를 입력해주세요."),
});

const EnterNewPassword: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const router = useRouter();
  const getUserInfo = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userInfo");

      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserInfo(userData);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleChangePassword = async (value: any) => {
    // console.log("vao day");

    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.changePasswordCode,
        body: {
          email: userInfo.email,
          phone: userInfo.phoneNumber,
          newPassword: value.password,
          confirmNewPassword: value.confirmPassword,
        },
      });
      if (res) {
        // router.push("/auth/login");
        console.log("OTP verified successfully");
        setIsError(false);
      }
    } catch (error) {
      console.error("error:", error);
      setIsError(true);
    }
    setOpenModal(true);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View className="flex-1 py-[40px] px-[16px]">
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleChangePassword}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="w-full flex-1">
            <ScrollView>
              <View>
                <View className="mb-[24px]">
                  <InputField
                    label="비밀번호"
                    placeholder="8자이상 영문+숫자+특수문자 모두 포함"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    touched={touched.password}
                    errors={errors.password}
                  />
                </View>
                <View className="mb-[24px]">
                  <InputField
                    label="비밀번호 확인"
                    placeholder="비밀번호 입력"
                    secureTextEntry
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    touched={touched.confirmPassword}
                    errors={errors.confirmPassword}
                  />
                </View>
              </View>
            </ScrollView>
            <View className="mt-auto">
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text className="text-center h-[50px] max-h-[50px] leading-[50px] bg-[#2F265D] text-[#fff] rounded-full text-[14px] font-defaultSemiBold">
                  비밀번호 변경
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>

      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "auto"}
        backgroundColor="#2F265D"
      />
      <FogotPasswordModal
        isError={isError}
        visible={openModal}
        handleCloseModal={() => setOpenModal(false)}
        handleSuccess={() => router.push("/auth/login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EnterNewPassword;
