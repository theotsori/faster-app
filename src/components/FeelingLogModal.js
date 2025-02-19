import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Slider } from 'react-native';

const FeelingLogModal = ({ onClose }) => {
  const [feeling, setFeeling] = useState(50);

  const logFeeling = () => {
    // Here you would save the feeling to your state or database
    console.log(`Feeling logged: ${feeling}`);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>How are you feeling?</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={feeling}
            onValueChange={setFeeling}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
          />
          <Text style={styles.feelingText}>{feeling}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={logFeeling}
            >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  slider: {
    width: 200,
    height: 40
  },
  feelingText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    width: '45%'
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonSave: {
    backgroundColor: "#4CAF50",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default FeelingLogModal;