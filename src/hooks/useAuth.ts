import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStoreKey } from '@/constants';
import * as Notifications from "expo-notifications";
import sendApiRequest from '@/utils/api';

interface AuthStore {
  isAuthenticated: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set) => ({
  isAuthenticated: false,

  signIn: async (token: string) => {
    try {
      await AsyncStorage.setItem(LocalStoreKey.TOKEN, token);
      set({ isAuthenticated: true });
      const pushTokenString = (
        await Notifications.getDevicePushTokenAsync()
      ).data;

      if (pushTokenString) {
        await sendApiRequest({
          method: "post",
          endPoint: "/device",
          body: {
            deviceToken: pushTokenString,
            // token,
          },
        });
      }
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      const pushTokenString = (
        await Notifications.getDevicePushTokenAsync()
      ).data;

      if (pushTokenString) {
        await sendApiRequest({
          method: "post",
          endPoint: "/device/delete",
          body: {
            deviceToken: pushTokenString,
          },
        });
      }
      await AsyncStorage.removeItem(LocalStoreKey.TOKEN);
      set({ isAuthenticated: false });
    } catch (error: any) {
      console.log("deleteErr:", error?.response?.data?.message);
      throw error;
    }
  },
}));
