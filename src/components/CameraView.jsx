import { forwardRef } from "react"
import { StyleSheet } from "react-native"
import { Camera } from "react-native-vision-camera"

const CameraView = forwardRef(({ device, isActive }, ref) => {
  return (
    <Camera
      ref={ref}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isActive}
      // frameProcessor={yourPostureDetectionFrameProcessor}
      // frameProcessorFps={15}
    />
  )
})

CameraView.displayName = "CameraView"

export default CameraView
