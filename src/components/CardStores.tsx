import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const CardImg = require("@/assets/images/cardImg.png");
const calendar = require("@/assets/images/calendar.png");
const diamond = require("@/assets/images/diamond.png");
const DefaultPlace = require("@/assets/images/default_place.png");

import DistanceIcon from "@/assets/icons/distance.svg";
import CashIcon from "@/assets/icons/cash-icon.svg";
import EventIcon from "@/assets/icons/event-icon.svg";

type StoreCardProps = {
  id: number;
  name: string;
  distance: string;
  imageUrl: any;
  cash: boolean;
  event: boolean;
};

export default function StoreCard({
  id,
  name,
  distance,
  imageUrl,
  cash,
  event,
}: StoreCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/places/place-detail/[id]",
          params: { id, type: "home" },
        })
      }
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imageUrl ? { uri: imageUrl } : DefaultPlace}
          style={styles.image}
          resizeMode="cover"
        />
        {(cash || event) && (
          <View style={styles.iconContainer}>
            {cash && (
              <View style={styles.icon}>
                <CashIcon />
              </View>
            )}
            {event && (
              <View style={styles.icon}>
                <EventIcon />
              </View>
            )}
          </View>
        )}
      </View>
      <Text style={styles.storeName}>{name}</Text>
      <View className="flex-row items-center px-[8px] space-x-2">
        <DistanceIcon />
        <Text style={styles.distance} className="mb-[4px]">
          {distance}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 164,
    height: 210,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  imageContainer: {
    margin: 8,
    height: 130,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D9D9D9",
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopRightRadius: 8,
    padding: 5,
    gap: 5,
    // width: 63,
    // height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    // padding: 2.5,
  },
  storeName: {
    marginHorizontal: 8,
    color: "#222222",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  distance: {
    marginTop: 2,
    color: "#9B9B9B",
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
  },
});
