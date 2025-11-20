import XIcon from "@/assets/icons/my/x.svg";
import { Formik } from "formik";
import {
  Modal,
  ModalProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";
import InputField from "../../InputField";
import sendApiRequest from "@/utils/api";
import { apiConfig } from "@/constants/apiConfig";
import { useModal } from "@/contexts/ModalContext";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("정보를 입력해주세요."),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "비밀번호는 8자이상 영문+숫자+특수문자 모두 포함되야 합니다."
    )
    .required("정보를 입력해주세요."),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "비밀번호가 일치하지 않습니다")
    .required("정보를 입력해주세요."),
});

interface Props extends ModalProps {
  handleCloseModal: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({
  handleCloseModal,
  ...props
}) => {
  const { setModal } = useModal();
  const handleUpdatePassword = async (value: any) => {
    try {
      const res: any = await sendApiRequest({
        ...apiConfig.auth.updatePassword,
        body: {
          password: value.oldPassword,
          newPassword: value.newPassword,
          confirmNewPassword: value.confirmNewPassword,
        },
      });
      if (res) {
        setModal({ open: "success", message: "비밀번호 변경 성공했습니다." });
      }
    } catch (error) {
      console.error("error:", error);
      setModal({ open: "error", message: "비밀번호 변경 실패했습니다." });
    }
  };

  return (
    <Modal animationType="slide" transparent={true} {...props}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View className="relative w-full">
                <Text className="leading-[29.9px] text-[23px] font-defaultSemiBold text-center">
                  비밀번호 변경
                </Text>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  className="top-[2px] absolute right-[0]"
                >
                  <XIcon />
                </TouchableOpacity>
              </View>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmNewPassword: "",
                }}
                onSubmit={handleUpdatePassword}
                validationSchema={validationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View className="w-full">
                    {/* Old Password */}
                    <View className="mb-[24px]">
                      <InputField
                        label="기존 비밀번호"
                        placeholder="기존 비밀번호 입력"
                        secureTextEntry
                        onChangeText={handleChange("oldPassword")}
                        onBlur={handleBlur("oldPassword")}
                        value={values.oldPassword}
                        touched={touched.oldPassword}
                        errors={errors.oldPassword}
                      />
                    </View>
                    {/* New Password */}
                    <View className="mb-[24px]">
                      <InputField
                        label="새 비밀번호"
                        placeholder="새 비밀번호 입력"
                        secureTextEntry
                        onChangeText={handleChange("newPassword")}
                        onBlur={handleBlur("newPassword")}
                        value={values.newPassword}
                        touched={touched.newPassword}
                        errors={errors.newPassword}
                      />
                    </View>
                    <View className="mb-[24px]">
                      <InputField
                        label="비밀번호 확인"
                        placeholder="새 비밀번호 다시 입력"
                        secureTextEntry
                        onChangeText={handleChange("confirmNewPassword")}
                        onBlur={handleBlur("confirmNewPassword")}
                        value={values.confirmNewPassword}
                        touched={touched.confirmNewPassword}
                        errors={errors.confirmNewPassword}
                      />
                    </View>
                    <TouchableOpacity onPress={() => handleSubmit()}>
                      <Text className="text-center h-[50px] max-h-[50px] leading-[50px] bg-[#2F265D] text-[#fff] rounded-full text-[14px] font-defaultSemiBold">
                        저장완료
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(47, 38, 93, 0.85)",
  },
  modalContent: {
    backgroundColor: "white",
    // borderRadius: 10,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 23,
    // fontWeight: "bold",
    fontFamily: "montserrat600",
    lineHeight: 29.9,
  },
});

export default ChangePasswordModal;
