import { StyleSheet, View, TouchableOpacity } from "react-native"
import TopBar from "./TopBar.jsx"
import PostureIndicator from "./PostureIndicator.jsx"
import BottomControls from "./BottomControls.jsx"

const CameraOverlay = ({
  showControls,
  isMonitoring,
  sessionTime,
  postureStatus,
  postureScore,
  alertsCount,
  cameraPosition,
  onBack,
  onToggleCamera,
  onToggleControls,
  onStartStop,
}) => {
  return (
    <View style={styles.overlay}>
      {/* Top Bar */}
      {showControls && (
        <TopBar
          isMonitoring={isMonitoring}
          sessionTime={sessionTime}
          cameraPosition={cameraPosition}
          onBack={onBack}
          onToggleCamera={onToggleCamera}
        />
      )}

      {/* Center Area - Tap to toggle controls */}
      <TouchableOpacity style={styles.centerArea} activeOpacity={1} onPress={onToggleControls}>
        {/* Posture Status Indicator */}
        {isMonitoring && <PostureIndicator postureScore={postureScore} postureStatus={postureStatus} />}
      </TouchableOpacity>

      {/* Bottom Controls */}
      {showControls && (
        <BottomControls
          isMonitoring={isMonitoring}
          alertsCount={alertsCount}
          postureStatus={postureStatus}
          onStartStop={onStartStop}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default CameraOverlay
