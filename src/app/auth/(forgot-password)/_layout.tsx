import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import { Slot } from "expo-router";

export default function ForgotPasswordLayout() {
  return (
    <Wrapper
      headerTheme="dark"
      headerType="BACK"
      headerScreenName={PageName.FORGOT_PASSWORD}
    >
      <Slot />
    </Wrapper>
  );
}
