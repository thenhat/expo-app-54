import Constants from 'expo-constants';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import WebView from "react-native-webview";

export default function NaverPaymentScreen() {
    const { data }: any = useGlobalSearchParams();
    const router = useRouter();

    const injectedJavaScript = `
    window.onload = function() {
      window.postMessage('${data}', '*');
    }
    true;
  `;

    const onMessage = (event: any) => {
        if (event.nativeEvent.data === "closed") {
            if (router.canGoBack()) {
                router.back();
            } else {
                router.replace("/");
            }
        }
    };

    return (
        <WebView
            style={styles.container}
            source={{ uri: "https://dev.hotel-laundry.com/payment?orderApp=true" }}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled={true}
            onMessage={onMessage}
        />
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        height: '100%',
        marginTop: Constants.statusBarHeight,
    },
});
