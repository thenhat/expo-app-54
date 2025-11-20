import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch } from "@/store/hook";
import { setSocialType } from "@/store/slice/storeSlice";
import sendApiRequest from "@/utils/api";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const AuthImage = require("@/assets/images/auth-image.png");
import KakaoIcon from "@/assets/icons/kakao-logo.svg";
import NaverIcon from "@/assets/icons/naver-log.svg";
import AppleIcon from "@/assets/icons/apple-logo.svg";

WebBrowser.maybeCompleteAuthSession();

const KAKAO_CLIENT_ID = "3968272600b817f158f254afefe6edbf";
const NAVER_CLIENT_ID = "rll0nhXzpyfPrAxLL1iW";
const WEB_REDIRECT_URI = "https://dev.hotel-laundry.com/auth/redirect";
let APPLE_RED = "https://api-dev.hotel-laundry.com/api/v1/auth/apple";
const state = Math.random().toString(36).substring(7);
const nonce = Math.random().toString(36).substring(7);

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(WEB_REDIRECT_URI)}&response_type=code`;
const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(WEB_REDIRECT_URI)}&state=hLiDdL2uhPtsftcU`;
const appleAuthUrl = `https://appleid.apple.com/auth/authorize?client_id=dev.hotel-laundry.com&redirect_uri=${encodeURIComponent(APPLE_RED)}&response_type=code%20id_token&state=${state}&scope=name%20email&nonce=${nonce}&response_mode=form_post`;

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const { setModal } = useModal();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSercure, setIsSercure] = useState<boolean>(true);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.loginAuth,
        body: {
          email: email,
          password: password,
        },
        requiredToken: false,
      });

      if (res?.access_token) {
        const token = res?.access_token;
        await signIn(token);
        router.replace("/");
      }
    } catch (error: any) {
      console.log("Login failed:", error);
      setModal({ open: "error", message: error?.response?.data?.message });
    }
  };

  const clickApple = async () => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(appleAuthUrl, APPLE_RED);
      await AsyncStorage.setItem("socialType", "APPLE");
      if (result.type === 'success') {
        const { url } = result;
        const parsed = Linking.parse(url);
        const { code, access_token, email } = parsed.queryParams || {};
        dispatch(setSocialType("APPLE"));

        loginAppleFc(access_token as string, code as string, email as string);
      }
    } catch (error) {
      console.error("Apple login error:", error);
      setModal({ open: "error", message: "Apple login failed" });
    }
  };

  const clickKakao = async () => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(kakaoAuthUrl, WEB_REDIRECT_URI);
      await AsyncStorage.setItem("socialType", "KAKAO");

      if (result.type === 'success') {
        const { url } = result;
        const parsed = Linking.parse(url);
        const { code } = parsed.queryParams || {};
        dispatch(setSocialType("KAKAO"));
        // Gọi API login Kakao ngay
        loginKakaoFc(code as string);
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      setModal({ open: "error", message: "Kakao login failed" });
    }
  };

  const clickNaver = async () => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(naverAuthUrl, WEB_REDIRECT_URI);
      await AsyncStorage.setItem("socialType", "NAVER");
      if (result.type === 'success') {
        const { url } = result;
        const parsed = Linking.parse(url);
        const { code } = parsed.queryParams || {};
        dispatch(setSocialType("NAVER"));
        loginNaverFc(code as string);
      }
    } catch (error) {
      console.error("Naver login error:", error);
      setModal({ open: "error", message: "Naver login failed" });
    }
  };

  const loginKakaoFc = async (code: string) => {
    const res: any = await sendApiRequest({
      ...apiConfig.auth.loginKakao,
      body: {
        snsType: 'KAKAO',
        code: code,
        redirectUri: "https://dev.hotel-laundry.com/auth/redirect"
      },
    });
    if (res?.access_token) {
      await signIn(res?.access_token);
      router.replace("/");
    } else if (res?.status) {
      router.push({
        pathname: "/auth/register",
        params: {
          code: res.code,
          snsType: "KAKAO",
        }
      });
    }
  };

  const loginNaverFc = async (code: string) => {
    const res: any = await sendApiRequest({
      ...apiConfig.auth.loginNaver,
      body: {
        snsType: 'NAVER',
        code: code,
        redirectUri: "https://dev.hotel-laundry.com/auth/redirect"
      },
    });

    if (res?.access_token) {
      await signIn(res?.access_token);
      router.replace("/");
    } else if (res?.status) {
      router.push({
        pathname: "/auth/register",
        params: {
          code: res.code,
          snsType: "NAVER",
        }
      });
    }
  };

  const loginAppleFc = async (access_token: string, code: string, email: string) => {
    if (access_token) {
      await signIn(access_token);
      router.replace("/");
    } else {
      router.push({
        pathname: "/auth/register",
        params: {
          code: code,
          email: email,
          snsType: "APPLE",
        }
      });
    }
  };

  return (
    <Wrapper showHeader={false}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={AuthImage} // Replace with your logo
              style={styles.logo}
            />
          </View>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.buttonClose}
          >
            {<AntDesign name="close" color="#999" size={22} />}
          </TouchableOpacity>
          <ScrollView
            style={{ height: "100%" }}
            className="h-[100%] flex-1 z-[111] mt-[-50px]"
          >
            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={styles.loginTitle}>로그인</Text>

              <Input
                label="이메일주소"
                placeholder="이메일주소 입력"
                value={email}
                onChangeText={setEmail}
                rounded={true}
              />

              <View style={styles.passwordContainer}>
                <Input
                  label="비밀번호"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={isSercure}
                  rounded={true}
                  right={
                    <TouchableOpacity onPress={() => setIsSercure(!isSercure)}>
                      {!isSercure && (
                        <Feather name="eye" color="#999" size={22} />
                      )}
                      {isSercure && (
                        <Feather name="eye-off" color="#999" size={22} />
                      )}
                    </TouchableOpacity>
                  }
                />
              </View>

              {/* Auto-login and Action Links */}
              <View style={styles.optionsRow}>
                <Checkbox
                  label="자동로그인"
                  checked={autoLogin}
                  onPress={() => setAutoLogin(!autoLogin)}
                />
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <Button
                    label="ID찾기"
                    mode="link"
                    color="black"
                    onPress={() => router.push("/auth/find-id")}
                    styleText={{ fontWeight: "400" }}
                  />
                  <Text style={{ color: "#DADADA", marginTop: -3 }}>|</Text>
                  <Button
                    label="비밀번호찾기"
                    mode="link"
                    color="black"
                    onPress={() =>
                      // router.push(
                      //   "/(app)/auth/(forgot-password)/enter-email-phone"
                      // )
                      router.push("/auth/(forgot-password)/enter-email-phone")
                    }
                    styleText={{ fontWeight: "400" }}
                  />
                </View>
              </View>

              <Button
                label="로그인"
                color="primary"
                mode="contained"
                size="large"
                onPress={handleLogin}
                styleButton={{ width: "100%", marginBottom: 16 }}
              />

              {/* Register Link */}
              <Button
                label="호텔런드리 회원가입"
                mode="link"
                color="info"
                onPress={() => router.push("/auth/register")}
              />
            </View>

            {/* Social Login */}
            <View style={styles.socialLoginContainer}>
              <View style={styles.socialLoginButton}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => {
                    clickKakao();
                  }}
                >
                  <KakaoIcon />
                </TouchableOpacity>
                <Text style={styles.socialLoginText}>카카오로 로그인</Text>
              </View>

              <View style={styles.socialLoginButton}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => {
                    clickNaver();
                  }}
                >
                  <NaverIcon />
                </TouchableOpacity>
                <Text style={styles.socialLoginText}>네이버로 로그인</Text>
              </View>

              <View style={styles.socialLoginButton}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => {
                    clickApple();
                  }}
                >
                  <AppleIcon />
                </TouchableOpacity>
                <Text style={styles.socialLoginText}>Apple로 로그인</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      <StatusBar
        style={Platform.OS === "ios" ? "dark" : "auto"}
        backgroundColor="#2F265D"
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  contentContainer: {
    height: "100%",
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "cover",
  },
  formContainer: {
    width: "100%",
    // marginTop: -50,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 40,
    padding: 16,
    zIndex: 111,
    // position: "absolute",
  },
  loginTitle: {
    fontSize: 22,
    lineHeight: 28.6,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 24,
    color: "#222",
  },
  input: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 12,
    fontSize: 14,
    color: "#222",
    borderWidth: 1,
    borderColor: "#E1E1E1",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: 24,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#BDBDBD",
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    marginBottom: 32,
  },
  autoLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: "#4CAF50",
  },
  autoLoginText: {
    fontSize: 14,
    color: "#222",
  },
  actionText: {
    fontSize: 14,
    color: "#4CAF50",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 14,
    color: "#4CAF50",
    textAlign: "center",
  },
  socialLoginContainer: {
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    gap: 42,
  },
  socialLoginButton: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    gap: 10,
    width: 56,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#DADADA",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    height: 24,
    width: 24,
    resizeMode: "cover",
  },
  socialLoginText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#888",
    fontWeight: "400",
    textAlign: "center",
  },
  buttonClose: {
    position: "absolute",
    top: 16,
    left: 16,
  },
});

export default LoginPage;
