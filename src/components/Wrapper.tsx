import { Href } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "./HeaderScreen";

// const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

interface Props {
  children: React.ReactNode;
  showHeader?: boolean;
  headerType?: "BACK" | "CLOSE";
  headerScreenName?: string;
  backgroundColor?: string;
  style?: any;
  headerTheme?: "light" | "dark";
  backUrl?: Href<string>;
}

const Wrapper: React.FC<Props> = ({
  children,
  showHeader = true,
  headerType = "CLOSE",
  headerScreenName = "",
  backgroundColor = "#fff",
  headerTheme = "light",
  style,
  backUrl,
}) => {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        // paddingTop: statusBarHeight || 0,
        backgroundColor,
        ...style,
      }}
    >
      {showHeader && (
        <HeaderScreen
          title={headerScreenName}
          type={headerType}
          theme={headerTheme}
          backUrl={backUrl}
        />
      )}
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;
