'use client';

import {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import {
  useCameraDevices,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';


import CameraView from '../components/CameraView.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';
import CameraOverlay from '../components/CameraOverlay.jsx';
import {usePostureMonitoring} from '../hooks/usePostureMonitoring.jsx';
import { runOnJS } from 'react-native-reanimated';
import { scanSKRNMLKitPose } from 'react-native-mlkit-pose-detection';

const PostureMonitoringScreen = ({navigation}) => {
  const devices = useCameraDevices();
  const {hasPermission, requestPermission} = useCameraPermission();
  const cameraRef = useRef(null);

  const [chosenCameraDevice, setChosenCameraDevice] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('front');
  const [showControls, setShowControls] = useState(true);

  // Use custom hook for posture monitoring logic
  const {
    isMonitoring,
    sessionTime,
    postureStatus,
    postureScore,
    alertsCount,
    handleStartStop,
    resetSession,
  } = usePostureMonitoring();

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';

  //   try {
  //     const detectedPoses = scanPose(frame, {
  //       performanceMode: 'fast', 
  //       detectorMode: 'stream',
  //     });

  //     if (detectedPoses.length > 0) {
  //       runOnJS(setPoses)(detectedPoses);
  //       runOnJS(analyzePosture)(detectedPoses[0]);
  //     }
  //   } catch (error) {
  //     console.error('Frame processor error:', error);
  //   }
  // }, []);

  const toggleCameraPosition = useCallback(() => {
    setCameraPosition(prevPosition =>
      prevPosition === 'front' ? 'back' : 'front',
    );
  }, []);

  const toggleControls = useCallback(() => {
    setShowControls(prev => !prev);
  }, []);

  useEffect(() => {
    const setupCameraAndPermissions = async () => {
      // Camera setup logic (same as your original)
      if (!hasPermission) {
        console.log('Vision Camera: Requesting camera permission...');
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Camera Access Required',
            'Posture AI needs camera access to monitor your posture. Please enable it in your device settings.',
            [
              {text: 'Go to Settings', onPress: () => Linking.openSettings()},
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => navigation.goBack(),
              },
            ],
          );
          setIsCameraActive(false);
          setChosenCameraDevice(null);
          return;
        }
      }

      if (devices.length > 0 && hasPermission) {
        let selectedDevice = devices.find(
          device => device.position === cameraPosition,
        );

        if (!selectedDevice) {
          console.warn(
            `${cameraPosition} camera not found, trying ${
              cameraPosition === 'front' ? 'back' : 'front'
            } camera.`,
          );
          selectedDevice = devices.find(
            device =>
              device.position ===
              (cameraPosition === 'front' ? 'back' : 'front'),
          );
        }

        if (!selectedDevice) {
          console.error('No functional camera device found on this device.');
          Alert.alert(
            'No Camera Found',
            'It seems your device does not have a functional camera. Posture monitoring cannot start.',
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
          setIsCameraActive(false);
          setChosenCameraDevice(null);
          return;
        }

        if (selectedDevice.id !== chosenCameraDevice?.id) {
          console.log(
            `Selected Camera Device: ${selectedDevice.position} (${selectedDevice.id})`,
          );
          setChosenCameraDevice(selectedDevice);
        }

        if (selectedDevice && hasPermission) {
          setIsCameraActive(true);
        } else {
          setIsCameraActive(false);
        }
      } else if (hasPermission && devices.length === 0) {
        console.log(
          'Permissions granted, but camera devices are still loading or not available.',
        );
        setIsCameraActive(false);
        setChosenCameraDevice(null);
      }
    };

    setupCameraAndPermissions();

    return () => {
      if (isCameraActive) {
        setIsCameraActive(false);
      }
    };
  }, [
    hasPermission,
    requestPermission,
    devices,
    navigation,
    chosenCameraDevice,
    cameraPosition,
  ]);

  if (!chosenCameraDevice || !isCameraActive) {
    return (
      <LoadingScreen
        hasPermission={hasPermission}
        devices={devices}
        chosenCameraDevice={chosenCameraDevice}
        onRetryPermission={requestPermission}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <CameraView
        ref={cameraRef}
        device={chosenCameraDevice}
        isActive={isCameraActive}
      />

      <CameraOverlay
        showControls={showControls}
        isMonitoring={isMonitoring}
        sessionTime={sessionTime}
        postureStatus={postureStatus}
        postureScore={postureScore}
        alertsCount={alertsCount}
        cameraPosition={cameraPosition}
        onBack={() => navigation.goBack()}
        onToggleCamera={toggleCameraPosition}
        onToggleControls={toggleControls}
        onStartStop={handleStartStop}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default PostureMonitoringScreen;
