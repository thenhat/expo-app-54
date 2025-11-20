import XIcon from "@/assets/icons/x.svg";
import { ReactNode } from "react";
import {
  Modal,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export interface DefaultModalProps extends ModalProps {
  children?: ReactNode;
  handleCloseModal: () => void;
}

const DefaultModal: React.FC<DefaultModalProps> = ({
  handleCloseModal,
  children,
  ...props
}) => {
  return (
    <Modal animationType="slide" transparent={true} {...props}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.wrapper}>
              <View style={styles.modalContent}>
                <View>{children}</View>
              </View>
              <TouchableOpacity onPress={handleCloseModal}>
                <XIcon />
              </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(47, 38, 93, 0.85)",
  },
  wrapper: {
    width: "100%",
    maxWidth: 500,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 23,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 25,
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

export default DefaultModal;
