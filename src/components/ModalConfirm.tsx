import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Modal } from "react-native";

const ModalConfirm: React.FC<any> = ({ modalVisible, setModalVisible, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
        <View style={styles.overlay}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>해당 예약을 취소하시겠습니까?</Text>
          <View style={styles.footer}>
            <Pressable
              style={[styles.button, styles.buttonOutline]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[styles.textStyle,styles.textOutline]}>아니오</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {onConfirm(), setModalVisible(!modalVisible)}}
            >
              <Text style={[styles.textStyle]}>예</Text>
            </Pressable>
          </View>
        </View>
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f265dd9', // Màu nền mờ với độ trong suốt
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 21,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  footer:{
    flexDirection: 'row',
    gap: 10
  },
  button: {
    borderRadius: 50,
    paddingVertical: 11,
    paddingHorizontal: 25,
    elevation: 2,
  },
  buttonOutline:{
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#CECECE',
  },
  buttonClose: {
    backgroundColor: "#2F265D",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: 'uppercase',
    fontSize: 14,
    lineHeight: 18
  },
  textOutline:{
    color: '#222222'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
    fontWeight: '600',
    color: "#222222",
  },
});

export default ModalConfirm;
