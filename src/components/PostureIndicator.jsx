import { StyleSheet, Text, View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { getPostureColor, getPostureMessage } from "../utils/PostureUtils.jsx";

const PostureIndicator = ({ 
  postureScore = 100, 
  postureStatus = "unknown", 
  confidence = null, 
  reason = null 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.9)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: postureScore,
        duration: 1200,
        useNativeDriver: false,
      })
    ]).start();

    // Subtle pulse for poor posture
    if (postureStatus === 'bad') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [postureScore, postureStatus]);

  const getModernColor = (status) => {
    switch (status) {
      case 'good': return '#00D4AA';
      case 'fair': return '#FFB800';
      case 'bad': return '#FF6B6B';
      default: return '#8B9DC3';
    }
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case 'good': return 'rgba(0, 212, 170, 0.12)';
      case 'fair': return 'rgba(255, 184, 0, 0.12)';
      case 'bad': return 'rgba(255, 107, 107, 0.12)';
      default: return 'rgba(139, 157, 195, 0.12)';
    }
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const circumference = 2 * Math.PI * 55;
  const strokeDasharray = circumference;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        {
          opacity: opacityValue,
          transform: [
            { scale: scaleValue },
            { scale: pulseValue }
          ],
          backgroundColor: getBackgroundColor(postureStatus),
          borderColor: getModernColor(postureStatus) + '30',
        }
      ]}
    >
      {/* Progress Circle with SVG-like effect */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressTrack, { borderColor: getModernColor(postureStatus) + '25' }]} />
        <Animated.View
          style={[
            styles.progressRing,
            {
              borderTopColor: getModernColor(postureStatus),
              borderRightColor: getModernColor(postureStatus),
              transform: [{
                rotate: animatedValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0deg', '360deg'],
                })
              }]
            }
          ]}
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Score with Grade */}
        <View style={styles.scoreContainer}>
          <Animated.Text style={[styles.score, { color: getModernColor(postureStatus) }]}>
            {animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 100],
            }).__getValue().toFixed(0)}
          </Animated.Text>
          <Text style={[styles.grade, { color: getModernColor(postureStatus) }]}>
            {getScoreGrade(postureScore)}
          </Text>
        </View>
        
        {/* Status Message */}
        <Text style={[styles.status, { color: getModernColor(postureStatus) }]}>
          {getPostureMessage(postureStatus)}
        </Text>

        {/* Confidence Level */}
        {confidence !== null && (
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceLabel}>Accuracy</Text>
            <View style={styles.confidenceBarContainer}>
              <View style={[styles.confidenceBar, { borderColor: getModernColor(postureStatus) + '30' }]}>
                <Animated.View
                  style={[
                    styles.confidenceFill,
                    {
                      width: `${confidence * 100}%`,
                      backgroundColor: getModernColor(postureStatus),
                    }
                  ]}
                />
              </View>
              <Text style={[styles.confidenceText, { color: getModernColor(postureStatus) }]}>
                {(confidence * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Detailed Reason */}
      {reason && (
        <View style={[styles.reasonContainer, { borderColor: getModernColor(postureStatus) + '20' }]}>
          <Text style={styles.reasonText} numberOfLines={2}>
            {reason}
          </Text>
        </View>
      )}

      {/* Status Indicator Dots */}
      <View style={styles.statusDots}>
        <View style={[
          styles.dot,
          { backgroundColor: postureStatus === 'good' ? '#00D4AA' : 'rgba(255,255,255,0.3)' }
        ]} />
        <View style={[
          styles.dot,
          { backgroundColor: postureStatus === 'fair' ? '#FFB800' : 'rgba(255,255,255,0.3)' }
        ]} />
        <View style={[
          styles.dot,
          { backgroundColor: postureStatus === 'bad' ? '#FF6B6B' : 'rgba(255,255,255,0.3)' }
        ]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 180,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    borderWidth: 1.5,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  progressContainer: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    top: 20,
  },
  progressTrack: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
  },
  progressRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
    marginTop: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  score: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  grade: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
    opacity: 0.8,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  confidenceContainer: {
    alignItems: 'center',
    width: 120,
  },
  confidenceLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    fontWeight: '500',
  },
  confidenceBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  confidenceBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 8,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '600',
    minWidth: 30,
  },
  reasonContainer: {
    position: 'absolute',
    bottom: -35,
    left: -10,
    right: -10,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
  },
  reasonText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: "center",
    lineHeight: 14,
  },
  statusDots: {
    position: 'absolute',
    bottom: 8,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default PostureIndicator;