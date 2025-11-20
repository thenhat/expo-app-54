import { apiConfig } from "@/constants/apiConfig";
import { useAuthContext } from "@/contexts/AuthContext";
import sendApiRequest from "@/utils/api";
import { useEffect, useState } from "react";

interface UseProfileReturn {
  profile: any;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<any>(null);
  const { isAuthenticated } = useAuthContext();

  const getMe = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.my.getMyInfo,
      });

      setProfile(res);
    } catch (error) {
      console.log("Get me failed:", error);
    }
  };

  useEffect(() => {
    isAuthenticated && getMe();
  }, [isAuthenticated]);

  return { profile };
};
