import { StyleSheet, Text, View } from "react-native"
import { getPostureColor, getPostureMessage } from "../utils/PostureUtils.jsx"

const PostureIndicator = ({ postureScore, postureStatus }) => {
  return (
    <View style={[styles.container, { borderColor: getPostureColor(postureStatus) }]}>
      <Text style={styles.score}>{postureScore}%</Text>
      <Text style={[styles.status, { color: getPostureColor(postureStatus) }]}>{getPostureMessage(postureStatus)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  score: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
})

export default PostureIndicator
