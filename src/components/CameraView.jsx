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
      preset="medium"
      photo={true}
      fps={30}
      format={device.formats[0]}
    />
  )
})

CameraView.displayName = "CameraView"

export default CameraView
