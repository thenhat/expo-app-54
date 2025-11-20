import { apiConfig } from "@/constants/apiConfig";
import * as Linking from "expo-linking";
import sendApiRequest from "@/utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/hooks/useAuth";


const RedirectPage: React.FC = () => {
  const [socialType, setSocialType] = useState<string>('');
  const router = useRouter();
  const { signIn } = useAuth();
  const { code, email, access_token } = useLocalSearchParams<any>();

  useEffect(() => {
    const getSocialType = async () => {
      const type = await AsyncStorage.getItem('socialType');
      setSocialType(type || '');
    };
    getSocialType();
  }, []);

  useEffect(() => {
    if ((code || access_token) && socialType) {
      if (socialType === "KAKAO") {
        loginKakaoFc(code as string);
      } else if (socialType === "NAVER") {
        loginNaverFc(code as string);
      } else if (socialType === "APPLE") {
        loginAppleFc(access_token as string);
      }
    }
  }, [code, socialType]);

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

  const loginAppleFc = async (access_token: string) => {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Redirect Screen</Text>
    </View>
  );
};

export default RedirectPage;
