import React, { useEffect, useState } from "react";
import {
  Button,
  DevSettings,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { storage } from "@/state/localStorage";

export const DebuggerMenu = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    DevSettings.addMenuItem("Toggle App Debugger", () => {
      setShow((state) => !state);
    });
  }, []);

  function handleClose() {
    setShow(false);
  }

  function handleClearMMKVStorage() {
    storage.clearAll();
    DevSettings.reload();
  }

  return (
    <Modal visible={show} presentationStyle="pageSheet" animationType="slide">
      <View style={styles.debuggerContainer}>
        <View style={styles.debuggerContent}>
          <Text style={styles.DebuggerText}>App Debugger</Text>
          <Button
            title="Clear local storage (MMKV)"
            onPress={handleClearMMKVStorage}
          />
        </View>
        <View style={styles.debuggerFooter}>
          <Button title="Close" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  debuggerContainer: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
  },
  debuggerContent: {
    flex: 1,
    gap: 10,
  },
  debuggerFooter: {
    padding: 20,
  },
  DebuggerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
});
