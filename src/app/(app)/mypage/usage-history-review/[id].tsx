import StarBoldIcon from "@/assets/icons/my/Star-Bold-33.svg";
import EmptyStarIcon from "@/assets/icons/my/Star-Empty-33.svg";
import StarReview from "@/components/mypage/StarReview";
import Wrapper from "@/components/Wrapper";
import PageName from "@/constants/PageName";
import { useModal } from "@/contexts/ModalContext";
import sendApiRequest from "@/utils/api";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DoubleHeartImg = require("@/assets/images/my/double-heart.png");

const UsageHistoryReview: React.FC = () => {
  const router = useRouter();
  const { setModal } = useModal();
  const { type, id, orderId, name } = useGlobalSearchParams();

  const [text, setText] = useState<string>("");
  const [starNumber, setStartNumber] = useState<number>(4);

  const sendReview = async () => {
    try {
      const endPoint =
        type == "TYPE_C" ? `/place/${id}/reviews` : `/stores/reviews/${id}`;
      const res: any = await sendApiRequest({
        method: "post",
        endPoint,
        body: {
          comment: text,
          star: starNumber,
          orderId,
          type:
            type === "TYPE_A"
              ? "ORDER_NORMAL"
              : type === "TYPE_B"
                ? "ORDER_NORMAL"
                : undefined,
        },
      });
      if (res) {
        setModal({
          open: "success",
          message:
            "리뷰를 남겨주셔서 감사합니다!",
          subMessage: "내가 남긴 리뷰는 마이페이지의 리뷰관리에서\n확인할 수 있습니다.",
          onAction: () => {
            router.push({
              pathname: "/mypage/usage-history",
              params: {
                statusParam: "complete",
                filterParam: type,
              },
            });
          },
          onClose: () => {
            router.push({
              pathname: "/mypage/usage-history",
              params: {
                statusParam: "complete",
                filterParam: type,
              },
            });
          },
        });
      }
    } catch (error) {
      console.error("error:", error);
      setModal({ open: "error", message: "Review sent failed" });
    }
  };

  const handleSubmitReview = () => {
    sendReview();
  };

  return (
    <Wrapper headerType="BACK" headerScreenName={PageName.USAGE_HISTORY_REVIEW}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <View className="p-[16px] block">
          <View className="items-center">
            <Image source={DoubleHeartImg} />
          </View>
          <Text className="text-[22px] leading-[33px] text-center font-defaultSemiBold text-[#000] mb-[4px]">
            <Text className="text-[#FEA31B]">{name}</Text>에서의
            {"\n"}경험은 어떠셨나요?
          </Text>
          <Text className="text-center text-[15px] leading-[27px] text-[#888] mb-[24px]">
            솔직한 리뷰를 남겨주세요.
          </Text>
          <View className="items-center mb-[28px]">
            <StarReview
              starBold={<StarBoldIcon />}
              emptyStar={<EmptyStarIcon />}
              defaultStar={starNumber}
              starSpacing={7.5}
              onStarChange={(star: number) => setStartNumber(star)}
            />
          </View>
          <View>
            <TextInput
              className="bg-[#F2F2F2] p-[15px] rounded-[20px] min-h-[150px]"
              multiline
              numberOfLines={8}
              onChangeText={setText}
              value={text}
              placeholder="내용 입력"
              style={{ textAlignVertical: "top" }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="pb-[30px] px-[16px]"
        onPress={handleSubmitReview}
        disabled={!text}
      >
        <View className={`text-center h-[50px] max-h-[50px] rounded-full px-[16px] ${text ? "bg-[#2F265D]" : "bg-[#F3F2F2]"}`}>
          <Text
            className={`leading-[50px] text-center text-[14px] font-defaultSemiBold ${text ? "text-[#fff]" : "text-[#D2D1D1]"}`}
          >
            리뷰 저장하기
          </Text>
        </View>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default UsageHistoryReview;
