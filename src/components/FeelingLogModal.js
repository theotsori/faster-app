import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const FeelingLogModal = ({ onClose }) => {
  const [feeling, setFeeling] = useState(50);

  const logFeeling = () => {
    // Save the feeling (this can be extended to update state or call an API)
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
          <Text style={styles.modalTitle}>How are you feeling?</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={feeling}
            onValueChange={setFeeling}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#307ecc"
          />
          <Text style={styles.feelingText}>{feeling}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={logFeeling}
            >
              <Text style={styles.buttonText}>Save</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalView: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 15,
  },
  feelingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#307ecc",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    elevation: 2,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: "#2196F3",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default FeelingLogModal;
