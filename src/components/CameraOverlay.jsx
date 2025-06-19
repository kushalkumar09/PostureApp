import { StyleSheet, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import TopBar from './TopBar.jsx';
import PostureIndicator from './PostureIndicator.jsx';
import BottomControls from './BottomControls.jsx';

const { width, height } = Dimensions.get('window');

const CameraOverlay = ({
  showControls,
  isMonitoring,
  sessionTime,
  postureData,
  alertsCount,
  cameraPosition,
  onBack,
  onToggleCamera,
  onToggleControls,
  onStartStop,
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideTopAnim = useRef(new Animated.Value(0)).current;
  const slideBottomAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animate controls visibility
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: showControls ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideTopAnim, {
        toValue: showControls ? 0 : -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideBottomAnim, {
        toValue: showControls ? 0 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [showControls]);

  // Pulse animation for monitoring state
  useEffect(() => {
    if (isMonitoring) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [isMonitoring]);

  const getPostureStatusColor = (status) => {
    switch (status) {
      case 'good': return 'rgba(16, 185, 129, 0.2)';
      case 'fair': return 'rgba(245, 158, 11, 0.2)';
      case 'bad': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  };

  return (
    <View style={styles.overlay}>
      {/* Background Gradient Overlay */}
      <View style={[
        styles.backgroundOverlay,
        { backgroundColor: getPostureStatusColor(postureData?.posture) }
      ]} />

      {/* Monitoring Status Ring */}
      {isMonitoring && (
        <Animated.View 
          style={[
            styles.monitoringRing,
            {
              transform: [{ scale: pulseAnim }],
              borderColor: postureData?.posture === 'good' ? '#10B981' : 
                          postureData?.posture === 'fair' ? '#F59E0B' : '#EF4444'
            }
          ]}
        />
      )}

      {/* Top Bar */}
      <Animated.View
        style={[
          styles.topSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideTopAnim }],
          },
        ]}
      >
        {showControls && (
          <TopBar
            isMonitoring={isMonitoring}
            sessionTime={sessionTime}
            cameraPosition={cameraPosition}
            onBack={onBack}
            onToggleCamera={onToggleCamera}
          />
        )}
      </Animated.View>

      {/* Center Area - Tap to toggle controls */}
      <TouchableOpacity
        style={styles.centerArea}
        activeOpacity={1}
        onPress={onToggleControls}
      >
        {/* Posture Guide Lines (when not monitoring) */}
        {!isMonitoring && (
          <View style={styles.postureGuide}>
            <View style={styles.headGuide} />
            <View style={styles.shoulderGuide} />
            <View style={styles.spineGuide} />
            <View style={styles.guideText}>
              <Animated.Text style={[styles.guideLabel, { opacity: fadeAnim }]}>
                Position yourself in the frame
              </Animated.Text>
            </View>
          </View>
        )}

        {/* Posture Status Indicator */}
        {isMonitoring && postureData && (
          <Animated.View
            style={[
              styles.indicatorContainer,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <PostureIndicator
              postureScore={postureData.score}
              postureStatus={postureData.posture}
              confidence={postureData.confidence}
              reason={postureData.reason}
            />
          </Animated.View>
        )}

        {/* Tap Hint */}
        {!showControls && (
          <Animated.View 
            style={[
              styles.tapHint,
              {
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ]}
          >
            <View style={styles.tapHintCircle}>
              <Animated.Text 
                style={[
                  styles.tapHintText,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                TAP
              </Animated.Text>
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>

      {/* Bottom Controls */}
      <Animated.View
        style={[
          styles.bottomSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideBottomAnim }],
          },
        ]}
      >
        {showControls && (
          <BottomControls
            isMonitoring={isMonitoring}
            alertsCount={alertsCount}
            postureStatus={postureData?.posture || 'unknown'}
            onStartStop={onStartStop}
          />
        )}
      </Animated.View>

      {/* Corner Indicators */}
      <View style={styles.cornerIndicators}>
        <View style={[styles.cornerIndicator, styles.topLeft]} />
        <View style={[styles.cornerIndicator, styles.topRight]} />
        <View style={[styles.cornerIndicator, styles.bottomLeft]} />
        <View style={[styles.cornerIndicator, styles.bottomRight]} />
      </View>

      {/* Session Progress Bar */}
      {isMonitoring && sessionTime > 0 && (
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: `${Math.min((sessionTime / 3600) * 100, 100)}%`, // 1 hour max
                backgroundColor: postureData?.posture === 'good' ? '#10B981' : 
                                postureData?.posture === 'fair' ? '#F59E0B' : '#EF4444'
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  monitoringRing: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginTop: -150,
    marginLeft: -150,
    opacity: 0.3,
  },
  topSection: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  postureGuide: {
    alignItems: 'center',
    opacity: 0.6,
  },
  headGuide: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  shoulderGuide: {
    width: 120,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    opacity: 0.7,
  },
  spineGuide: {
    width: 2,
    height: 100,
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
  },
  guideText: {
    position: 'absolute',
    bottom: -60,
    alignItems: 'center',
  },
  guideLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  indicatorContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  tapHint: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  tapHintCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapHintText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bottomSection: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cornerIndicators: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  cornerIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
  },
  topLeft: {
    top: 80,
    left: 30,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 80,
    right: 30,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 120,
    left: 30,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 120,
    right: 30,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});

export default CameraOverlay;