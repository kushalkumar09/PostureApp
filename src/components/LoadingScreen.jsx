import { StyleSheet, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, StatusBar } from "react-native"

const LoadingScreen = ({ hasPermission, devices, chosenCameraDevice, onRetryPermission }) => {
  const getLoadingMessage = () => {
    if (!hasPermission) return "Waiting for Camera Permission..."
    if (chosenCameraDevice) return "Initializing Camera..."
    return "Finding Camera Device..."
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />

      {((hasPermission && devices.length > 0) || (hasPermission && !chosenCameraDevice)) && (
        <ActivityIndicator size="large" color="#4F46E5" />
      )}

      <Text style={styles.loadingText}>{getLoadingMessage()}</Text>

      {!hasPermission && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetryPermission}>
          <Text style={styles.retryButtonText}>Retry Permission</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  retryButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default LoadingScreen
