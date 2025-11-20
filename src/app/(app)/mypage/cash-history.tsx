import EmptyData from "@/components/EmptyData";
import AmountTop from "@/components/mypage/AmountTop";
import HistoryItem, { ItemType } from "@/components/mypage/HistoryItem";
import Panagition from "@/components/Panagition";
import TabComponent from "@/components/Tab";
import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import { useAppDispatch } from "@/store/hook";
import { setLoading } from "@/store/slice/globalSlice";
import sendApiRequest from "@/utils/api";
import formatNumbers from "@/utils/format";
import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const tabs = [
  { value: "INCREASE", label: "적립" },
  { value: "DECREASE", label: "사용" },
];

const CashHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState({
    value: "INCREASE",
    label: "적립",
  });

  const [cashData, setCashData] = useState<any>({
    totalCash: 0,
    // totalCashBetween: 0,
    totalEl: 0,
    listCash: [],
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListCash = async () => {
    dispatch(setLoading(true));
    try {
      const res: any = await sendApiRequest({
        method: "get",
        endPoint: "/cash",
        body: {
          status: activeTab.value,
        },
      });
      if (res) {
        const listCash = res?.list_cash?.content;
        const totalP = res?.list_cash?.page?.totalPages || 1;
        const listCashFormat = listCash?.map((el: any) => {
          return {
            amount: el.cash,
            type: "CASH",
            historyDetail: el.message,
            startTime: moment(el.createdDate).format("YYYY-MM-DD HH:mm:ss"),
            expiryTime: `${moment(el.expirationDate).format("YYYY-MM-DD")} 까지`,
            status: activeTab.value,
          };
        });
        setCashData({
          totalCash: res.totalCash || 0,
          totalEl: res?.list_cash?.page?.totalElements || 0,
          // totalCashBetween: res.totalCashBetween || 0,
          listCash: listCashFormat,
        });
        setTotalPage(totalP);
      }
    } catch (error) {
      console.log("error:", error);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getListCash();
  }, [activeTab.value, currentPage]);

  return (
    <Wrapper
      backUrl="/(tabs)/mypage"
      headerType="BACK"
      headerScreenName={PageName.CASH_HISTORY}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View className="p-[16px]">
          <View className="pb-[10px]">
            <AmountTop
              label="보유 캐시"
              type="CASH"
              amount={formatNumbers(cashData.totalCash)}
            />
          </View>
          <View className="py-[5px]">
            <TabComponent
              activeTab={activeTab}
              listTab={tabs}
              onChange={(val: any) => setActiveTab(val)}
              mode="default"
              color="primary"
            />
          </View>
          <View>
            {cashData?.listCash?.length > 0 ? (
              <>
                {cashData?.listCash?.map((item: any, index: number) => (
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
              </>
            ) : (
              <EmptyData />
            )}
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default CashHistory;
