import EmptyData from "@/components/EmptyData";
import AmountTop from "@/components/mypage/AmountTop";
import { ItemType } from "@/components/mypage/HistoryItem";
import Panagition from "@/components/Panagition";
import TabComponent from "@/components/Tab";
import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/slice/globalSlice";
import sendApiRequest from "@/utils/api";
import formatNumbers from "@/utils/format";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
const coupon_bg = require("@/assets/images/coupon/coupon-bg.png");
const coupon_expired = require("@/assets/images/coupon/coupon-bg-expire.png");
const coupon_used = require("@/assets/images/coupon/coupon-bg-used.png");

const tabs = [
  { value: "tab1", label: "적립" },
  { value: "tab2", label: "사용/만료" },
];

const CouponHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState({ value: "tab1", label: "적립" });
  const [data, setData] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getPointData = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: "/coupons",
        body: {
          size: 10,
          page: currentPage,
          status: activeTab.value === "tab1" ? "earn" : "used",
        },
      });
      if (res) {
        const respData = res?.list_coupon?.content;

        setData(respData);
        setTotal(res?.total_coupon);
        setTotalPage(res?.list_coupon?.page?.totalPages);
      }

      // setPage()
    } catch (error) {
      console.log("error:", error);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getPointData();
  }, [activeTab.value, currentPage]);

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={[
          styles.item,
        ]}
      >
        {activeTab.value === "tab1" && (
          <Image
            source={coupon_bg}
            style={styles.image}
          />
        )}

        {activeTab.value === "tab2" && (
          <Image
            source={item?.expired ? coupon_expired : coupon_used}
            style={styles.image}
          />
        )}

        <View
          style={[
            styles.itemContent,
          ]}
        >
          <View className="absolute left-0 right-0 top-[12px] z-10 flex flex-col pl-[10px]">
            <View className="flex flex-row items-center gap-[5px]">
              <View className="flex flex-col items-center">
                {(() => {
                  const nameParts = item.name?.split(' ') || [];
                  const name1 = nameParts[0] || '';
                  const name2 = nameParts.slice(1).join(' ') || '';

                  const getFontSize = (length: number) => {
                    if (length === 3) return 'text-[22px]';
                    if (length === 4 || length === 5) return 'text-[20px]';
                    return 'text-[15px] tracking-tighter -ml-[1px]';
                  };

                  const fontSize1 = getFontSize(name1.length);
                  const fontSize2 = getFontSize(name2.length);

                  return (
                    <>
                      {name1 && <Text className={cn(`${item.type === 'DISCOUNT_PERCENT' ? 'text-[#FFF]' : 'text-[#FBE118]'} ${fontSize1} font-montserrat500 leading-[25px]`)}>{name1}</Text>}
                      {name2 && <Text className={cn(`text-[#FFF] ${fontSize2} font-montserrat500 leading-[25px]`)}>{name2}</Text>}
                    </>
                  );
                })()}
              </View>
              <View>
                <Text className="text-[#FFF] text-[45px] font-oswald600">
                  {item.type === 'DISCOUNT_PERCENT' ? `${formatNumbers(item.discountPercent)}` : `${formatNumbers(+item.discountFixed / 1000)}`}
                  <Text className="text-[20px] font-oswald600 ml-[2px]">{item.type === 'DISCOUNT_PERCENT' ? "%" : "천원"}</Text>
                </Text>
              </View>
            </View>
            <View className="-mt-1 ml-[5px]">
              <HTML
                contentWidth={width}
                source={{ html: item?.requite }}
                tagsStyles={{
                  p: {
                    fontSize: 12,
                    color: '#FFF',
                    fontFamily: "montserrat400",
                    lineHeight: 17,
                    marginBottom: 0,
                    marginTop: 0,
                  },
                }}
              />
              <Text className="text-[#FFF] text-[12px] font-montserrat400">사용기간: {item.endDate}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <Wrapper
        backUrl={"/(tabs)/mypage"}
        headerType="BACK"
        headerScreenName={PageName.COUPON_HISTORY}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        >
          <View className="p-[16px]">
            <View className="pb-[10px]">
              <AmountTop label="보유 쿠폰" type="COUPON" qty={`${total}`} />
            </View>
            <View className="py-[5px]">
              <TabComponent
                activeTab={activeTab}
                listTab={tabs}
                onChange={(val: any) => (setActiveTab(val), setCurrentPage(0))}
                mode="default"
                color="primary"
              />
            </View>
            <View>
              {data?.length > 0 ? (
                <>
                  {/* {data?.map((item: any, index: number) => (
                  <View key={index}>
                    {index > 0 && (
                      <View className="h-[8px] bg-[#F4F4F4] block mx-[-16px]" />
                    )}
                    <HistoryItem item={item} />
                  </View>
                ))} */}

                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
                  />
                  {totalPage > 1 && (
                    <Panagition
                      onChange={(p: number) => setCurrentPage(p)}
                      totalPage={totalPage}
                    />
                  )}
                </>
              ) : (
                <EmptyData />
              )}
            </View>
          </View>
        </ScrollView>
      </Wrapper>
    </GestureHandlerRootView>

  );
};

export default CouponHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative",
    flex: 1,
    width: "100%",
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 13,
    paddingBottom: 10
  },

  titleText: {
    color: "#222222",
    fontWeight: '600',
    fontSize: 23,
    lineHeight: 30,
    flex: 1,
    textAlign: "center",
  },
  itemText: {
    color: "#222222",
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
  },

  desText: {
    color: "#888888",
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  listMachine: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item: {
    position: "relative",
    flex: 1,
    margin: 5,
    maxWidth: '47%',
  },
  itemActive: {
  },
  image: {
    justifyContent: "center",
    width: "100%",
    resizeMode: 'stretch',
    height: 250,
    flex: 1,
  },
  itemContent: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    zIndex: 9999
  },
  itemContentActive: {
  },
  leftItem: {
    width: "22%",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 40,
  },
  rightItem: {
    marginLeft: 15,
  },
  itemTextActive: {
    color: "#2F265D",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
});
