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
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate entrance
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: postureScore,
        duration: 800,
        useNativeDriver: false,
      })
    ]).start();
  }, [postureScore]);

  // Create circular progress animation
  const circumference = 2 * Math.PI * 60; // radius = 60
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return '✅';
      case 'fair': return '⚠️';
      case 'bad': return '❌';
      default: return '❓';
    }
  };

  const getGradientColors = (status) => {
    switch (status) {
      case 'good': return ['#10B981', '#059669'];
      case 'fair': return ['#F59E0B', '#D97706'];
      case 'bad': return ['#EF4444', '#DC2626'];
      default: return ['#6B7280', '#4B5563'];
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        {
          opacity: opacityValue,
          transform: [{ scale: scaleValue }]
        }
      ]}
    >
      {/* Background Circle */}
      <View style={styles.backgroundCircle} />
      
      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground} />
        <Animated.View
          style={[
            styles.progressFill,
            {
              backgroundColor: getPostureColor(postureStatus),
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

      {/* Content */}
      <View style={styles.content}>
        {/* Status Icon */}
        <Text style={styles.statusIcon}>
          {getStatusIcon(postureStatus)}
        </Text>

        {/* Score */}
        <Animated.Text style={styles.score}>
          {animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 100],
          }).__getValue().toFixed(0)}
        </Animated.Text>
        <Text style={styles.scoreLabel}>SCORE</Text>

        {/* Status */}
        <Text style={[styles.status, { color: getPostureColor(postureStatus) }]}>
          {getPostureMessage(postureStatus).toUpperCase()}
        </Text>

        {/* Confidence Bar */}
        {confidence !== null && (
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceLabel}>
              Confidence
            </Text>
            <View style={styles.confidenceBar}>
              <Animated.View
                style={[
                  styles.confidenceFill,
                  {
                    width: `${confidence * 100}%`,
                    backgroundColor: confidence > 0.7 ? '#10B981' : confidence > 0.4 ? '#F59E0B' : '#EF4444'
                  }
                ]}
              />
            </View>
            <Text style={styles.confidenceText}>
              {(confidence * 100).toFixed(0)}%
            </Text>
          </View>
        )}
      </View>

      {/* Reason/Message */}
      {reason && (
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonText} numberOfLines={2}>
            {reason}
          </Text>
        </View>
      )}

      {/* Decorative Elements */}
      <View style={[styles.decorativeRing, { borderColor: getPostureColor(postureStatus) + '30' }]} />
      <View style={[styles.decorativeRing2, { borderColor: getPostureColor(postureStatus) + '20' }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  progressContainer: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBackground: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressFill: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#10B981',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  statusIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  score: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scoreLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1,
    opacity: 0.8,
    marginTop: -4,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  confidenceContainer: {
    alignItems: 'center',
    marginTop: 12,
    width: 120,
  },
  confidenceLabel: {
    fontSize: 10,
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: 4,
    fontWeight: '500',
  },
  confidenceBar: {
    width: 80,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  confidenceText: {
    fontSize: 10,
    color: "#FFFFFF",
    marginTop: 2,
    fontWeight: '600',
  },
  reasonContainer: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    right: -20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reasonText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 16,
    opacity: 0.9,
  },
  decorativeRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  decorativeRing2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderStyle: 'dotted',
  },
});

export default PostureIndicator;