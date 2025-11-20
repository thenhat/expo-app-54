import InputField from "@/components/InputField";
import UploadFile from "@/components/UploadFile";
import Wrapper from "@/components/Wrapper";
import { apiConfig } from "@/constants/apiConfig";
import PageName from "@/constants/PageName";
import { useModal } from "@/contexts/ModalContext";
import sendApiRequest from "@/utils/api";
import { uploadFile } from "@/utils/upload-file";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("내용을 입력해주세요"),
  content: Yup.string().required("내용을 입력해주세요"),
  // file: Yup.string().required("File is required"),
});

const Question: React.FC = () => {
  const { setModal } = useModal();
  const router = useRouter();
  // const showAlert = (resetForm: () => void) => {
  //   Alert.alert("", "Send question successfully", [
  //     { text: "OK", onPress: () => resetForm() },
  //   ]);
  // };

  const handleSendQuestion = async (values: any, { resetForm }: any) => {
    let image: any = "";
    if (values.file) {
      const fileOrigin = values?.file?.assets[0];
      image = await uploadFile(fileOrigin);
      if (!image) {
        setModal({ open: "error", message: "Upload file failed" });
        return;
      }
    }

    try {
      const res: any = await sendApiRequest({
        ...apiConfig.my.question,
        body: {
          title: values.title,
          content: values.content,
          images: [image.url],
        },
      });
      if (res) {
        // showAlert(resetForm);
        setModal({ open: "success", message: "문의 전송 완료했습니다." });
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <Wrapper
      backUrl={"/(tabs)/mypage"}
      headerType="BACK"
      headerScreenName={PageName.QUESTION_1_1}
    >
      <View className="p-[16px] flex-1 flex-col">
        <Formik
          initialValues={{
            title: "",
            content: "",
            file: null,
          }}
          onSubmit={handleSendQuestion}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            resetForm,
            values,
            errors,
            touched,
          }) => (
            <View className="flex-1">
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "space-between",
                  paddingBottom: 24,
                }}
              >
                <View>
                  <InputField
                    label="제목"
                    placeholder="제목 입력"
                    onChangeText={handleChange("title")}
                    value={values.title}
                    disabled={false}
                    containerClassName="mb-[32px]"
                    touched={touched.title}
                    errors={errors.title}
                  />
                  <View>
                    <Text className="text-[#999999] text-[14px] leading-[18.2px] font-defaultRegular mb-[5px]">
                      내용
                    </Text>
                    <TextInput
                      className="bg-[#F2F2F2] p-[15px] rounded-[20px]"
                      multiline
                      numberOfLines={8}
                      onChangeText={handleChange("content")}
                      value={values.content}
                      placeholder="내용 입력"
                      style={{ textAlignVertical: "top" }}
                    />
                    {touched.content && errors.content && (
                      <Text className="text-[#DF1519] text-[12px] mt-[2px]">
                        {errors.content}
                      </Text>
                    )}
                  </View>
                  <View className="mt-[32px]">
                    <Text className="text-[#999999] text-[14px] leading-[18.2px] font-defaultRegular mb-[5px]">
                      파일첨부
                    </Text>
                    <UploadFile
                      onChange={(file) => setFieldValue("file", file)}
                      reset={!values.file}
                    />
                    {/* {touched.file && errors.file && (
                      <Text className="text-[#DF1519] text-[12px] mt-[2px]">
                        {errors.file}
                      </Text>
                    )} */}
                  </View>
                </View>
              </ScrollView>

              <View className="mt-auto mb-[14px]">
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <View className="h-[50px] max-h-[50px] leading-[50px] bg-[#2F265D] rounded-full">
                    <Text className="text-center leading-[50px] text-[#fff] text-[14px] font-defaultSemiBold">
                      문의 남기기
                    </Text>
                  </View>

                </TouchableOpacity>
                <Text className="text-[#888] text-[13px] leading-[23.4px] font-defaultRegular mt-[12px] text-center">
                  문의에 대한 답변은 회원ID의 메일로 발송됩니다.
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Wrapper>
  );
};

export default Question;
