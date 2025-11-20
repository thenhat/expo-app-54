import { TouchableOpacity, View, Text, Alert, Pressable } from "react-native";
import RightArrowIcon from "@/assets/icons/my/CaretRight-20.svg";
import StarRating from "@/components/mypage/StarRating";
import moment from "moment";
import { useRouter } from "expo-router";

export type ReviewItemType = {
  author: string;
  starNumber: 1 | 2 | 3 | 4 | 5;
  content: string;
  createdAt: string;
  visitAt: string;
  id: number;
  detailId: number;
  type: string;
  visitDate?: string;
};

interface Props {
  item: ReviewItemType;
  // handleDeleteReview: (id: number, type: string) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<number | undefined>>
}
// sđ
const ReviewItem: React.FC<Props> = ({ item, setOpenModal }) => {
  const { author, starNumber, content, createdAt, visitAt, id, type } = item;
  const router = useRouter();
  // const showAlertDelete = () => {
  //   Alert.alert("", "선택한 리뷰를 삭제하시겠습니까?", [
  //     {
  //       text: "cancel",
  //       // onPress: () => console.log("cancel"),
  //       style: "cancel",
  //     },
  //     { text: "Ok", onPress: () => handleDeleteReview(id, type) },
  //   ]);
  // };

  return (
    <View className="py-[24px]">
      <View className="flex-row items-center justify-between">
        <View className="gap-[10px] flex-col">
          <Pressable className="flex-row items-center gap-[4px]" onPress={() =>
            type === "stores" ? router.push({
              pathname: "/store-detail/[id]",
              params: { id: `${item?.detailId}` },
            }) : router.push({
              pathname: "/places/place-detail/[id]",
              params: { id: `${item?.detailId}` },
            })

          }>
            <Text className="text-[17px] leading-[30.6px] font-defaultSemiBold text-[#222]">
              {author}
            </Text>
            <RightArrowIcon />
          </Pressable>
          <View>
            <StarRating rating={starNumber} />
          </View>
        </View>
        <TouchableOpacity onPress={() => setOpenModal(id)}>
          <View className="flex items-center justify-center bg-[#222] h-[35px] leading-[35px] rounded-full px-[20px]">
            <Text className="font-defaultSemiBold text-[14px] text-[#fff] text-center">
              삭제
            </Text>
          </View>

        </TouchableOpacity>
      </View>
      <Text className="mt-[5px] text-[15px] text-[#000] font-defaultRegular leading-[27px]">
        {content}
      </Text>
      <Text className="text-[#888888] text-[12px] leading-[21.6px] font-defaultRegular mt-[8px]">{`${moment(createdAt).format("YYYY-MM-DD HH:mm")}`} (방문 {moment(visitAt).format("YYYY-MM-DD")})</Text>
    </View>
  );
};

export default ReviewItem;
