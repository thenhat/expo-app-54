import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined) {
    // Đợi trạng thái xác thực (tránh nháy màn hình)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2F265D" />
      </View>
    );
  }

  return isAuthenticated ? children : null;
}
