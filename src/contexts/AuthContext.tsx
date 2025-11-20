import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { useFocusEffect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStoreKey } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { setGeolocation, setListStore, setListStoreMap, setStoreActive, setStoreLastUsed } from "@/store/slice/storeSlice";
import { checkInitialNotification, registerForPushNotificationsAsync, setupNotificationListeners } from "@/utils/notifications";
import { usePathname, useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { setListNotice } from "@/store/slice/noticesSlice";

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [notification, setNotification] = useState(false);
  const router = useRouter();

  const handleNotificationResponse = (response: any) => {
    if (response) {
      router.push('/mypage/notification');
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));

    const cleanup = setupNotificationListeners(
      (notification: any) => {
        setNotification(notification);
      });

    checkInitialNotification(handleNotificationResponse);

    return cleanup;
  }, []);

  useEffect(() => {
    const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        getApiLocation();
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      dispatch(setGeolocation(locationData));
      getApiLocation(locationData);
    } catch (error) {
      console.error("Error getting location:", error);
      dispatch(setGeolocation(null));
      getApiLocation();
    }
  };


  useFocusEffect(
    useCallback(() => {
      getLocation();
      return () => { };
    }, [])
  );

  const getApiLocation = (geolocation?: any) => {
    fetchListStore(geolocation);
    fetchApiStoreLastUsed(geolocation);
  }

  const fetchApiStoreLastUsed = async (geolocation?: any) => {
    const respon: any = await sendApiRequest({
      ...apiConfig.store.getStoreLastUsed,
      body: {
        latitude: geolocation?.latitude,
        longitude: geolocation?.longitude,
      },
    });

    if (respon?.msg === "success") {
      dispatch(setStoreLastUsed(respon.data));
      dispatch(setStoreActive(respon.data));
    }
    return respon;
  };

  const fetchApiNotices = async () => {
    const token = await AsyncStorage.getItem(LocalStoreKey.TOKEN);
    if (token) {
      const respon: any = await sendApiRequest({
        ...apiConfig.notices.getNotices
      });

      if (respon) {
        dispatch(setListNotice(respon));
      }
      return respon;
    }
  };

  useEffect(() => {
    fetchApiNotices();
  }, [pathname, notification]);

  const fetchListStore = async (geolocation?: any) => {
    const res: any = await sendApiRequest({
      ...apiConfig.store.getStoreList,
      body: {
        latitude: geolocation?.latitude,
        longitude: geolocation?.longitude
      },
    });

    if (res?.msg === "success") {
      dispatch(setListStore(res?.data));
      dispatch(setListStoreMap(res?.data));
      // !storeActive?.id && dispatch(setStoreActive(res?.data[0]));
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await AsyncStorage.getItem(LocalStoreKey.TOKEN);
      if (token) {
        useAuth.setState({ isAuthenticated: true });
      }
    };

    initializeAuth();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
