import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import PlusIcon from "@/assets/images/svgs/plus.svg";
import DecreaseIcon from "@/assets/images/svgs/decrease.svg";
import CloseCircleIcon from "@/assets/images/svgs/close-circle.svg";
import Button from "../Button";
import { apiConfig } from "@/constants/apiConfig";
import sendApiRequest from "@/utils/api";
import { useSelector, useDispatch } from "react-redux";
import formatNumbers from "@/utils/format";
import { setOptionDryCleaning } from "@/store/slice/storeSlice";
import MessageErrorModal from "../Modal/MessageError";

export default function Business() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dataOption, setDataOption] = useState<any[]>([]);
  const storeActive = useSelector((state: any) => state.store.storeActive);
  const { id } = useLocalSearchParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const [visible, setVisible] = useState(false);
  const { optionDryCleaning, listDryCleaning } = useSelector((state: any) => state.store);

  useEffect(() => {
    if (optionDryCleaning.length > 0) {
      const total = optionDryCleaning.reduce((acc: any, option: any) => {
        const optionTotal = option.optionsReqBody.reduce(
          (sum: any, item: any) => sum + (item.quantity * item.price),
          0
        );
        return acc + optionTotal;
      }, 0);

      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [optionDryCleaning]);

  useEffect(() => {
    if (storeActive && id) {
      fetchOptionDryCleaning();
    }
  }, [storeActive, id]);

  const convertData = (data: any) => {
    const existingOptions = optionDryCleaning.find((item: any) => item.type === id);

    return data?.map((item: any) => {
      const existingOption = existingOptions?.optionsReqBody.find(
        (opt: any) => opt.idOption === item.id
      );

      return {
        ...item,
        title: item?.name,
        quantity: existingOption?.quantity || 0,
      }
    })
  }

  const fetchOptionDryCleaning = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.getOptionDryCleaning,
        endPoint: `/dry-cleaning/store/${storeActive?.id}/${id}`,
        body: {},
      });

      if (res) {
        console.log(' res: ', res)
        setDataOption(convertData(res?.data))
      }
    } catch (error) {
      setVisible(true);
    }
  }

  const handleAddMore = () => {
    router.push('/drycleaning');
  };

  const handleChange = useCallback(
    (item: any) => {
      const updatedData = dataOption.map(
        (i: any) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setDataOption(updatedData);

      const selectedOptions = updatedData
        .filter(item => item.quantity > 0)
        .map(item => ({
          idOption: item.id,
          quantity: item.quantity,
          price: item.price
        }));

      const newOptionDryCleaning = [...optionDryCleaning];
      const existingIndex = newOptionDryCleaning.findIndex(item => item.type === id);

      if (existingIndex !== -1) {
        newOptionDryCleaning[existingIndex] = {
          type: id,
          optionsReqBody: selectedOptions
        };
      } else {
        newOptionDryCleaning.push({
          type: id,
          optionsReqBody: selectedOptions
        });
      }

      dispatch(setOptionDryCleaning(newOptionDryCleaning));
    },
    [dataOption, optionDryCleaning, id]
  );

  const handleChangeDecrease = useCallback(
    (item: any) => {
      const updatedData = dataOption.map((i: any) => {
        if (i.id === item.id && i.quantity > 0) {
          return { ...i, quantity: i.quantity - 1 };
        }
        return i;
      });
      setDataOption(updatedData);

      const selectedOptions = updatedData
        .filter(item => item.quantity > 0)
        .map(item => ({
          idOption: item.id,
          quantity: item.quantity,
          price: item.price
        }));

      const newOptionDryCleaning = [...optionDryCleaning];
      const existingIndex = newOptionDryCleaning.findIndex(item => item.type === id);

      if (existingIndex !== -1) {
        if (selectedOptions.length > 0) {
          newOptionDryCleaning[existingIndex] = {
            type: id,
            optionsReqBody: selectedOptions
          };
        } else {
          newOptionDryCleaning.splice(existingIndex, 1);
        }
      }

      dispatch(setOptionDryCleaning(newOptionDryCleaning));
    },
    [dataOption, optionDryCleaning, id]
  );

  const handleCloseModal = () => {
    setVisible(false);
    router.push('/drycleaning');
  };

  const handlePayment = async () => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.order.postDryCleaning,
        body: {
          orderDevice: "MOBILE",
          idStore: storeActive?.serialNumber,
          calculatedReqBody: {
            typesReqBodies: optionDryCleaning,
          }
        },
      });

      router.push({
        pathname: "/payment",
        params: {
          oid: res?.data?.oid,
          type: 'cleaning'
        },
      })
    } catch (error) {
      console.log('error: ', error)
    }
  };

  const handleRemoveOption = useCallback((option: any) => {
    const newOptionDryCleaning = optionDryCleaning.filter(
      (item: any) => item.type !== option.type
    );

    dispatch(setOptionDryCleaning(newOptionDryCleaning));

    if (option.type === id) {
      const resetData = dataOption.map(item => ({
        ...item,
        quantity: 0
      }));
      setDataOption(resetData);
    }
  }, [optionDryCleaning, id, dataOption]);

  const renderSummary = () => {
    if (!optionDryCleaning.length) return null;

    return optionDryCleaning.map((option: any, index: number) => {
      const dryCleaningType = listDryCleaning.find((item: any) => item.id === option.type);

      const totalQuantity = option.optionsReqBody.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );

      const totalAmount = option.optionsReqBody.reduce(
        (sum: number, item: any) => sum + (item.quantity * item.price),
        0
      );

      return (
        <View key={index} style={styles.itemTotal}>
          <Text style={styles.itemTotalText}>
            {dryCleaningType?.title} {totalQuantity}개
          </Text>
          <View style={styles.itemTotalRight}>
            <Text style={[styles.itemTotalText, { fontWeight: 600 }]}>
              {formatNumbers(totalAmount)}원
            </Text>
            <TouchableOpacity onPress={() => handleRemoveOption(option)}>
              <CloseCircleIcon />
            </TouchableOpacity>
          </View>

        </View>
      );
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.titleText}>비즈니스</Text>

        <View style={styles.listOption}>
          {dataOption?.map((item: any, index) => {
            return (
              <View key={index} style={[styles.item]}>
                <View style={[styles.itemLeft]}>
                  <Text style={[styles.itemText]}>
                    {item?.title} ({formatNumbers(item?.price)})
                  </Text>
                </View>
                <View style={[styles.itemRight]}>
                  <Text
                    style={[
                      styles.textPrice,
                      item?.quantity === 0 ? { color: "#BCBCBC" } : {},
                    ]}
                  >
                    {item?.quantity !== 0
                      ? formatNumbers(item?.price * item?.quantity)
                      : "..."}
                  </Text>
                  <View style={[styles.itemQuantity]}>
                    <TouchableOpacity
                      style={[styles.itemButton]}
                      onPress={() => handleChangeDecrease(item)}
                    >
                      <DecreaseIcon />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.textQuantity,
                        item?.quantity === 0 ? { color: "#BCBCBC" } : {},
                      ]}
                    >
                      {item?.quantity}
                    </Text>
                    <TouchableOpacity
                      style={[styles.itemButton]}
                      onPress={() => handleChange(item)}
                    >
                      <PlusIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        {renderSummary()}
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>결제금액</Text>
          <Text style={styles.priceText}>{formatNumbers(totalPrice)}원</Text>
        </View>
        <View style={styles.listBtn}>
          <View className="flex-1">
            <Button
              label="세탁물 추가"
              size="large"
              mode="outlined"
              color="primary"
              styleButton={{ width: "100%" }}
              onPress={handleAddMore}
            />
          </View>
          <View className="flex-1">
            <Button
              label="결제하기"
              size="large"
              mode="contained"
              color="primary"
              styleButton={{ width: "100%" }}
              onPress={handlePayment}
            />
          </View>
        </View>
      </View>
      <MessageErrorModal message={"해당 매점에 드라이클리닝이 지원하지 않습니다"}
        visible={visible}
        handleCloseModal={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 24,
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
  listOption: {
    marginTop: 20,
  },
  shadowProp: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  item: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 18,
  },
  itemLeft: {
    width: "55%",
    textAlign: "left",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  itemQuantity: {
    flexDirection: "row",
  },
  textPrice: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 19.5,
  },
  textQuantity: {
    width: 46,
    color: "#222222",
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 19.5,
    justifyContent: "center",
    textAlign: "center",
  },
  itemButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 18,
    height: 18,
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
    fontSize: 15,
    lineHeight: 19.5,
  },
  line: {
    backgroundColor: "#F4F4F4",
    height: 8,
  },
  itemTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTotalText: {
    color: "#222222",
    fontSize: 14,
    lineHeight: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  priceText: {
    color: "#06C164",
    fontWeight: '600',
    fontSize: 19,
    lineHeight: 24.7,
  },
  listBtn: {
    flexDirection: "row",
    gap: 13,
    marginTop: 40
  },
  itemTotalRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
