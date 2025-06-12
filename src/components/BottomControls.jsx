import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

const BottomControls = ({ isMonitoring, alertsCount, postureStatus, onStartStop }) => {
  const getStatusText = () => {
    switch (postureStatus) {
      case "good":
        return "Good"
      case "warning":
        return "Fair"
      case "poor":
        return "Poor"
      default:
        return "Unknown"
    }
  }

  return (
    <View style={styles.container}>
      {/* Stats Row */}
      {isMonitoring && (
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{alertsCount}</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getStatusText()}</Text>
            <Text style={styles.statLabel}>Current</Text>
          </View>
        </View>
      )}

      {/* Main Button */}
      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: isMonitoring ? "#EF4444" : "#10B981" }]}
        onPress={onStartStop}
      >
        <Text style={styles.mainButtonText}>{isMonitoring ? "Stop Monitoring" : "Start Monitoring"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 10,
  },
  mainButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
})

export default BottomControls
