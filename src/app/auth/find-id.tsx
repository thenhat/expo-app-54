import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import PageName from "@/constants/PageName";
import { useModal } from "@/contexts/ModalContext";
import useCountDown from "@/hooks/useCountDown";
import sendApiRequest from "@/utils/api";
import { convertSecondToMinutes } from "@/utils/format";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object({
  phoneNumber: Yup.string().required("Phone number is required"),
  otp: Yup.string().required("Opt is required"),
});

const FindIDPage: React.FC = () => {
  const router = useRouter();
  const { setModal } = useModal();
  const { seconds, isRunning, start } = useCountDown(
    180,
    true,
    "findIdCountDown"
  );
  const [idFetched, setIdFetched] = useState<string>("");
  const [isverifyOtp, setIsVerifyOtp] = useState<boolean>(false);

  const handleSendRequestOtp = async (phone: string) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.sendFindIdCode,
        body: {
          mobile: phone,
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
        ...apiConfig.auth.verifyFindIdCode,
        body: {
          code,
          mobile: phone,
        },
      });
      if (res) {
        // console.log("OTP verified successfully");
        setModal({
          open: "success",
          message: "전화번호 인증 완료되었습니다.",
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

  const handleFindId = async (values: any) => {
    if (!isverifyOtp) {
      setModal({
        open: "info",
        message: "Please verify OTP",
      });
      return;
    }
    try {
      const res: any = await sendApiRequest({
        method: "post",
        endPoint: "/me/forgot-email",
        body: {
          code: values.otp,
          phone: values.phoneNumber,
        },
      });
      if (res) {
        setIdFetched(res);
      }
    } catch (error) {
      console.log("error:", error);
      setModal({
        open: "error",
        message: "Error",
      });
    }
  };

  return (
    <Wrapper
      headerType="BACK"
      headerScreenName={PageName.FIND_ID}
      headerTheme="dark"
    >
      <View style={styles.scrollContainer}>
        {/** Header */}
        {/* <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", left: 16 }}
          >
            <AntDesign name="arrowleft" color={"#625C81"} size={22} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>ID찾기</Text>
        </View> */}

        {!idFetched && (
          <View style={styles.contentContainer}>
            <Text style={styles.text}>
              회원가입시 인증한 휴대폰 번호를 입력해주세요.
            </Text>

            <View style={{ flex: 1 }}>
              <Formik
                initialValues={{
                  phoneNumber: "",
                  otp: "",
                }}
                onSubmit={handleFindId}
                validationSchema={validationSchema}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                  <View className="flex-col flex-1">
                    {/*phonenumber - otp */}
                    <View>
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
                            <Text
                              className={`text-center text-[14px] font-defaultSemiBold ${isverifyOtp ? "text-[#D8D8D8]" : "text-[#2F265D]"}`}
                            >
                              완료
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      // style={[styles.submitButton, { flexDirection: "column" }]}
                      className="mt-auto"
                    >
                      <Button
                        label="ID 찾기"
                        color="primary"
                        mode="contained"
                        onPress={handleSubmit}
                        styleButton={{ width: "100%" }}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        )}

        {/** show response */}
        {idFetched && (
          <View style={styles.contentContainer}>
            <View style={styles.responsedContainer}>
              <Text style={styles.message}>입력한 정보와 일치하는 ID는</Text>
              <Text style={styles.messageTitle}>{idFetched}</Text>
            </View>
            <View style={styles.submitButton}>
              <View style={{ flex: 1 }}>
                <Button
                  label="비밀번호 찾기"
                  color="black"
                  mode="outlined"
                  onPress={() => router.push("/auth/enter-email-phone")}
                  styleButton={{ width: "100%" }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  label="로그인하기"
                  color="primary"
                  mode="contained"
                  onPress={() => router.push("/auth/login")}
                  styleButton={{ width: "100%" }}
                />
              </View>
            </View>
          </View>
        )}

        <StatusBar
          style={Platform.OS === "ios" ? "dark" : "auto"}
          backgroundColor="#2F265D"
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    paddingHorizontal: 16,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2F265D",
  },
  titleHeader: {
    fontSize: 17,
    fontWeight: "600",
    color: "#C0BDCE",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    flex: 1,
    position: "relative",
  },
  text: {
    fontSize: 14,
    lineHeight: 18.2,
    color: "#222",
    marginBottom: 12,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 24,
    alignItems: "flex-end",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14,
    color: "#222",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    marginBottom: 12,
  },
  buttonSmall: {
    backgroundColor: "#FFFFFF",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  buttonSmallText: {
    color: "#4CAF50",
    fontSize: 14,
  },
  submitButton: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    right: 16,
    flexDirection: "row",
    gap: 16,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  responsedContainer: {
    borderRadius: 10,
    gap: 10,
    paddingVertical: 24,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EEEBFE",
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 19.5,
    color: "#6A6A6A",
  },
  messageTitle: {
    textAlign: "center",
    fontSize: 19,
    lineHeight: 24.7,
    fontWeight: "600",
    color: "#2F265D",
  },
});

export default FindIDPage;
