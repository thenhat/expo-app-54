import { apiConfig } from "@/constants/apiConfig";
import { setListDryCleaning } from "@/store/slice/storeSlice";
import sendApiRequest from "@/utils/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
const vestImg = require("@/assets/images/dry/vest.png");
const shirtImg = require("@/assets/images/dry/shirt.png");
const trousersImg = require("@/assets/images/dry/trousers.png");
const sweaterImg = require("@/assets/images/dry/sweater.png");
const jacketImg = require("@/assets/images/dry/jacket.png");
const shoeImg = require("@/assets/images/dry/shoe.png");
const towelImg = require("@/assets/images/dry/towel.png");

export default function LaundryTypes() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(3);
  const dispatch = useDispatch();
  const listDryCleaning = useSelector((state: any) => state.store.listDryCleaning);

  useEffect(() => {
    fetchListDryCleaning();
  }, []);

  const getImg = (id: string) => {
    switch (id) {
      case "BUSSINESS_CLOTHING":
        return vestImg;
      case "UPPER_CLOTHING":
        return shirtImg;
      case "TOPPER_CLOTHING":
        return trousersImg;
      case "JUMPER":
        return sweaterImg;
      case "COAT":
        return jacketImg;
      case "SHOES":
        return shoeImg;
      case "OTHER":
        return towelImg;
    }
  }

  const convertData = (data: any) => {
    return data?.map((item: any) => {
      return {
        id: item?.key,
        title: item?.name,
        image: getImg(item?.key),
      }
    })
  }

  const fetchListDryCleaning = async () => {
    const res: any = await sendApiRequest({
      ...apiConfig.order.getListDryCleaning,
      body: {},
    });

    if (res) {
      dispatch(setListDryCleaning(convertData(res?.data)));
    }
  }



  const handleChange = (value: any) => {
    setIsActive(value?.id);
    router.push(`/drycleaning/drycleaning-detail/${value?.id}`)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>세탁물 종류</Text>

      <View style={styles.listMachine}>
        {listDryCleaning?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              style={[styles.item]}
              key={index}
              onPress={() => handleChange(item)}
            >
              <View
                style={[
                  styles.itemHeader,
                  isActive === item?.id ? styles.itemHeader : {},
                ]}
              >
                <Image source={item?.image} style={styles.itemImage} />
                <View
                  style={[
                    styles.headerBgr,
                    isActive === item?.id ? { backgroundColor: '#2F265D' } : {},
                  ]}
                />
              </View>

              <Text style={[styles.itemText, isActive === item?.id ? { color: '#2F265D' } : {},]}>{item?.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    paddingVertical: 35,
    marginTop: 8,
  },
  info: {
    backgroundColor: "#2F265D",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoText: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  titleText: {
    color: "#000",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  desText: {
    color: "#FFFFFF",
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19.5,
    marginTop: 4,
  },
  listMachine: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  item: {
    width: "33.33%",
    textAlign: "center",
    justifyContent: "center",
  },
  itemMachineActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2F265D",
    color: "#2F265D",
  },
  itemHeader: {
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  headerBgr: {
    backgroundColor: "#888888",
    position: "absolute",
    width: 80,
    height: 80,
    top: 25,
    left: 20,
    zIndex: -1,
  },

  itemImage: {
    justifyContent: "center",
    width: "auto",
    maxWidth: "100%",
  },
  itemText: {
    fontWeight: '600',
    color: "#888888",
    fontSize: 14,
    lineHeight: 25.2,
    textAlign: "center",
  },
});
