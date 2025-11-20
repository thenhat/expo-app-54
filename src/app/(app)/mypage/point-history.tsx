import EmptyData from "@/components/EmptyData";
import AmountTop from "@/components/mypage/AmountTop";
import HistoryItem, { ItemType } from "@/components/mypage/HistoryItem";
import Panagition from "@/components/Panagition";
import TabComponent from "@/components/Tab";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import PageName from "@/constants/PageName";
import { useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/slice/globalSlice";
import sendApiRequest from "@/utils/api";
import formatNumbers from "@/utils/format";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const tabs = [
  { value: "earn", label: "적립" },
  { value: "used", label: "사용" },
];

const PointHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState({
    value: "earn",
    label: "적립",
  });
  const [pointData, setPointData] = useState<any>([]);
  // const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getPointData = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.my.getPoint,
        body: {
          // page,
          status: activeTab.value,
          page: currentPage,
          size: 10,
        },
      });
      if (res?.list_point) {
        const formattedData = res?.list_point?.content?.map((item: any) => {
          const newItem: ItemType = {
            amount: formatNumbers(item.point),
            status: item.status,
            type: "POINT",
            historyDetail:
              activeTab.value === "earn"
                ? !item.machineName
                  ? item.message
                  : item.message === "구매 적립"
                    ? `서비스 이용 적립 – ${item.machineName}`
                    : `예약 취소 적립 - ${item.machineName}`
                : `서비스 사용 - ${item.machineName}`,
            startTime: dayjs(item.createdDate).format("YYYY.MM.DD HH:mm:ss"),
            expiryTime: `${dayjs(item.createdDate).format("YYYY.MM.DD")} 까지`,
          };
          return newItem;
        });
        setPointData(formattedData);
        setTotalPoints(res?.total_point);
        setTotalPage(res?.list_point?.page?.totalPages || 1);
      }
    } catch (error) {
      console.log("error:", error);
    }
    dispatch(setLoading(false));
  };

  // const handlePressPrev = () => {
  //   setCurrentPage((prev: number) => {
  //     if (prev > 0) {
  //       return prev - 1;
  //     }
  //     return prev;
  //   });
  // };
  // const handlePressNext = () => {
  //   setCurrentPage((prev: number) => prev + 1);
  // };

  useEffect(() => {
    getPointData();
  }, [activeTab, currentPage]);

  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.POINT_HISTORY}
    >
      <View>
        <View className="pb-[10px] px-[16px] pt-[16px]">
          <AmountTop
            label="보유 포인트"
            type="POINT"
            amount={formatNumbers(totalPoints)}
          />
        </View>
        <View className="py-[5px] px-[16px]">
          <TabComponent
            activeTab={activeTab}
            listTab={tabs}
            onChange={(val: any) => setActiveTab(val)}
            mode="default"
            color="primary"
          />
        </View>
        <View className=" mb-[320px] relative">
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            {pointData?.length > 0 ? (
              <Fragment>
                {pointData?.map((item: any, index: number) => (
                  <View key={index}>
                    {index > 0 && (
                      <View className="h-[8px] bg-[#F4F4F4] block mx-[-16px]" />
                    )}
                    <HistoryItem item={item} />
                  </View>
                ))}
                {totalPage > 1 && (
                  <Panagition
                    onChange={(p: number) => setCurrentPage(p)}
                    totalPage={totalPage}
                  />
                )}
              </Fragment>
            ) : (
              <EmptyData />
            )}
          </ScrollView>
          {/* {currentPage > 1 && (
            <View className="pt-[20px]">
              <Panagition
                handleNext={handlePressNext}
                handlePrev={handlePressPrev}
              />
            </View>
          )} */}
        </View>
      </View>
    </Wrapper>
  );
};

export default PointHistory;
