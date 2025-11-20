import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const injectedJS = `
  (function() {
    function loadChannelIO() {
      if (window.ChannelIO) {
        return console.log("ChannelIO already loaded");
      }
      var ch = function() { ch.c(arguments); };
      ch.q = [];
      ch.c = function(args) { ch.q.push(args); };
      window.ChannelIO = ch;

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      script.charset = "UTF-8";
      script.onload = function() {
        console.log("ChannelIO script loaded");

        setTimeout(() => {
          ChannelIO('boot', { pluginKey: "dfd49057-bc7d-4a24-b555-f83308d818e9" }, function onSuccess(response) {
            console.log("ChannelIO boot success:", response);
            setTimeout(() => {
              ChannelIO('showMessenger');
              window.ReactNativeWebView.postMessage("chatOpened");
            }, 1000);
          });
        }, 500);
      };
      script.onerror = function() {
        console.error("Failed to load ChannelIO script, retrying...");
        setTimeout(loadChannelIO, 2000);
      };

      document.head.appendChild(script);
    }

    if (document.readyState === "complete") {
      loadChannelIO();
    } else {
      window.addEventListener("load", loadChannelIO);
    }

    ChannelIO('onHideMessenger', function() {
      window.ReactNativeWebView.postMessage("chatClosed");
    });
  })();
  true;
`;

  const onMessage = (event: any) => {
    if (event.nativeEvent.data === "chatOpened") {
      setLoading(false);
    } else if (event.nativeEvent.data === "chatClosed") {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    }
  };

  return (
    // <Wrapper
    //   headerType="BACK"
    //   headerScreenName={PageName.FIND_ID}
    //   headerTheme="dark"
    // >
    <SafeAreaView className="flex-1">
      <View style={styles.scrollContainer}>
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              zIndex: 10,
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <WebView
          originWhitelist={["*"]}
          source={{ uri: "https://blank.page" }}
          injectedJavaScript={injectedJS}
          javaScriptEnabled={true}
          onMessage={onMessage}
        />
      </View>
    </SafeAreaView>

    // </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "red",
  },
});

export default ChatScreen;
