import Button from "@/components/Button";
import InputField from "@/components/InputField";
import RegisterSuccessModal from "@/components/Modal/Auth/RegisterSuccessModal";
import MessageSuccessModal from "@/components/Modal/MessageSuccess";
import MultiCheckbox, { Item } from "@/components/MultiCheckbox";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import PageName from "@/constants/PageName";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/hooks/useAuth";
import useCountDown from "@/hooks/useCountDown";
import sendApiRequest from "@/utils/api";
import { convertSecondToMinutes } from "@/utils/format";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const AuthImage = require("@/assets/images/register-bg.png");

const agreementsitems: Item[] = [
  {
    id: "taService",
    label: "서비스 이용약관 (필수)",
  },
  {
    id: "taPrivacy",
    label: "개인정보 수집 및 이용 동의 (필수)",
  },
  {
    id: "taLocation",
    label: "위치기반 서비스 이용약관 (필수)",
  },
  {
    id: "taMarketing",
    label: "마케팅 정보 수신 동의 (선택)",
  },
];

const validationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "비밀번호는 8자이상 영문+숫자+특수문자 모두 포함되야 합니다.\n 특수문자 !@#$%&^*"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다")
    .required("Please confirm your password"),
  phoneNumber: Yup.string().required("Phone number is required"),
  otp: Yup.string().required("Opt is required"),
  agreements: Yup.array()
    .of(Yup.string())
    .test("agreements-required", "필수 약관에 동의해야 합니다.", (value) => {
      const requiredItems = ["taService", "taPrivacy", "taLocation"];
      return requiredItems.every((item) => value?.includes(item));
    }),
});

const validationSchemaSns = Yup.object({
  phoneNumber: Yup.string().required("Phone number is required"),
  otp: Yup.string().required("Opt is required"),
});

const RegistrationPage: React.FC = () => {
  const { setModal } = useModal();
  // console.log('setModal ', setModal);

  const [success, setSuccess] = useState<{
    type: "normal" | "sns";
    open: boolean;
  }>({
    type: "normal",
    open: false,
  });
  const router = useRouter();
  const { signIn } = useAuth();
  const [isResend, setResend] = useState<boolean>(false);
  const { code, snsType, email } = useGlobalSearchParams();

  const { seconds, isRunning, start } = useCountDown(
    180,
    true,
    "registerCountDown"
  );

  const [isverifyOtp, setIsVerifyOtp] = useState<boolean>(false);

  const handleSendRequestOtp = async (phone: string) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.fetchOtp,
        body: {
          mobile: phone,
        },
      });
      if (res) {
        !isRunning && start();
        setResend(true);
      }
    } catch (error) {
      console.log("error:", error);
      setModal({ message: "OTP 발신 실패했습니다.!", open: "error" });
    }
  };

  const handleSubmitOtp = async (code: string, phone: string) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.verifyOtp,
        body: {
          code,
          mobile: phone,
        },
      });
      if (res) {
        console.log("OTP verified successfully");
        setModal({
          message: "전화번호 인증 완료되었습니다.",
          open: "success",
        });
        setIsVerifyOtp(true);
      }
    } catch (error) {
      console.log("error:", error);
      setModal({
        message: "OTP 인증 실패했습니다.",
        open: "error",
      });
    }
  };

  const handleRegister = async (values: any) => {
    if (!isverifyOtp) {
      setModal({
        message: "Please verify OTP",
        open: "info",
      });
      return;
    }

    const payload: any = {
      fullName: values.name,
      email: values.email,
      mobile: values.phoneNumber,
      password: values.password,
      passwordConfirm: values.confirmPassword,
      otp: values.otp,
      termsAgree: values.agreements?.reduce(
        (acc: Record<string, boolean>, key: string) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>
      ),
    };
    if (values.agreements?.includes("taMarketing")) {
      payload.verification = {
        email: true,
        mobile: true,
      };
    }

    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.registerAuth,
        body: { ...payload },
      });
      if (res) {
        setSuccess({ open: true, type: "normal" });
      }
    } catch (error: any) {
      console.log("error:", error);
      setModal({
        message: error?.response?.data?.message,
        open: "error",
      });
    }
  };

  const handleRegisterSns = async (values: any) => {
    if (!isverifyOtp) {
      setModal({
        message: "Please verify OTP",
        open: "info",
      });
      return;
    }

    const payload: any = {
      snsType: snsType,
      code: code,
      email: email,
      mobile: values.phoneNumber,
    };

    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.registerOthers,
        body: { ...payload },
      });
      if (res?.access_token) {
        await signIn(res?.access_token);
        setSuccess({ open: true, type: "sns" });
        setTimeout(() => {
          router.replace("/");
        }, 500)
      }
    } catch (error: any) {
      console.log("error:", error);
      setModal({
        message: error?.response?.data?.message,
        open: "error",
      });
    }
  };

  return (
    <Wrapper showHeader={false}>
      <RegisterSuccessModal
        visible={success.open}
        handleCloseModal={() =>
          setSuccess((prev: any) => ({ open: false, type: prev.type }))
        }
        onOk={() =>
          success.type === "normal"
            ? router.push("/auth/login")
            : router.push("/")
        }
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={AuthImage} // Replace with your logo
              style={styles.logo}
            />
          </View>

          <View style={styles.contentContainer}>
            {/** Header */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ position: "absolute", left: 16 }}
              >
                <AntDesign name="arrowleft" color={"#625C81"} size={22} />
              </TouchableOpacity>
              <Text style={styles.titleHeader}>{PageName.REGISTER}</Text>
            </View>

            <ScrollView>
              {!code && (
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phoneNumber: "",
                    otp: "",
                    agreements: [] as string[],
                  }}
                  onSubmit={handleRegister}
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
                    <View style={styles.formContainer}>
                      {/* name */}
                      <View>
                        <InputField
                          label="이름"
                          placeholder="이름 입력"
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          value={values.name}
                          touched={touched.name}
                          errors={errors.name}
                        />
                      </View>
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
                      {/* Password */}
                      <View>
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
                      {/*confirm password */}
                      <View>
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
                        <Text style={styles.smallText}>비밀번호는 8자이상 영문+숫자+특수문자 모두 포함되야 합니다.
                          특수문자 !@#$%&^*
                        </Text>
                      </View>
                      {/*phonenumber - otp */}
                      <View>
                        <Text className="text-[#999999] text-[14px] leading-[18.2px] font-defaultRegular mb-[5px]">
                          전화번호
                        </Text>
                        <View className="flex-row items-start">
                          <InputField
                            // label="전화번호"
                            // numberOfLines={}
                            keyboardType="numeric"
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
                              isRunning || !values.phoneNumber
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
                                  : isResend
                                    ? "재전송"
                                    : "인증번호받기"}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View className="flex-row items-start mt-[12px]">
                          <InputField
                            keyboardType="numeric"
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
                      {/*agreements */}
                      <View>
                        <MultiCheckbox
                          label="약관 전체 동의"
                          items={agreementsitems}
                          onChange={(selectedItems) =>
                            setFieldValue("agreements", selectedItems)
                          }
                          touched={touched.agreements}
                          errors={errors.agreements}
                        />
                      </View>
                      <Button
                        onPress={handleSubmit}
                        disabled={
                          !isverifyOtp ||
                          !values.agreements?.includes("taMarketing")
                        }
                        label="회원가입"
                        mode="contained"
                        color="primary"
                        styleButton={{ width: "100%", marginTop: 8 }}
                      />
                    </View>
                  )}
                </Formik>
              )}

              {code && (
                <Formik
                  initialValues={{
                    phoneNumber: "",
                    otp: "",
                  }}
                  onSubmit={handleRegisterSns}
                  validationSchema={validationSchemaSns}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                  }) => (
                    <View style={styles.formContainer}>
                      {/*phonenumber - otp */}
                      <View>
                        <Text className="text-[#999999] text-[14px] leading-[18.2px] font-defaultRegular mb-[5px]">
                          전화번호
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

                      <Button
                        onPress={handleSubmit}
                        disabled={!isverifyOtp}
                        label="회원가입"
                        mode="contained"
                        color="primary"
                        styleButton={{ width: "100%", marginTop: 8 }}
                      />
                    </View>
                  )}
                </Formik>
              )}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "auto"}
        backgroundColor="#FFFFFF"
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    height: 60,
    paddingBottom: 5,
    // paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleHeader: {
    fontSize: 17,
    fontWeight: "600",
    color: "#C0BDCE",
  },
  smallText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#999999",
    marginTop: 4
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 40,
    gap: 24,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
  },
  logo: {
    width: "100%",
    resizeMode: "cover",
  },
});

export default RegistrationPage;
