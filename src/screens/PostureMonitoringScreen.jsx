'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  Platform,
  View,
  Text,
} from 'react-native';
import {
  useCameraDevices,
  useCameraPermission,
  Camera,
} from 'react-native-vision-camera';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';
import CameraOverlay from '../components/CameraOverlay';
import LoadingScreen from '../components/LoadingScreen';
import { usePostureMonitoring } from '../hooks/usePostureMonitoring';

const PostureMonitoringScreen = ({ navigation }) => {
  // State and refs
  const [webViewError, setWebViewError] = useState(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const cameraRef = useRef(null);
  const webviewRef = useRef(null);

  // Camera hooks
  const devices = useCameraDevices();
  const { hasPermission, requestPermission } = useCameraPermission();
  
  // State management
  const [chosenCameraDevice, setChosenCameraDevice] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('front');
  const [showControls, setShowControls] = useState(true);

  // Posture monitoring
  const {
    isMonitoring,
    sessionTime,
    postureStatus,
    postureScore,
    alertsCount,
    handleStartStop,
    resetSession,
  } = usePostureMonitoring();

  // WebView message handler with debounce
  const handleMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('WebView message:', data);
      // Process pose data here
    } catch (error) {
      console.error('Message parsing error:', error);
    }
  }, []);

  // Camera setup and permission handling
  useEffect(() => {
    const setupCamera = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Camera Access Required',
            'Please enable camera access in settings',
            [
              { text: 'Settings', onPress: Linking.openSettings },
              { text: 'Cancel', onPress: () => navigation.goBack() },
            ]
          );
          return;
        }
      }

      const device = devices.find(d => d.position === cameraPosition) || devices[0];
      if (device) setChosenCameraDevice(device);
    };

    setupCamera();
  }, [hasPermission, devices, cameraPosition]);

  if (!chosenCameraDevice || !hasPermission) {
    return (
      <LoadingScreen 
        onRetry={requestPermission}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={chosenCameraDevice}
        isActive={isCameraActive}
        preset="medium"
        fps={30}
        format={chosenCameraDevice.formats[0]}
      />

      <WebView
        ref={webviewRef}
        source={{
          uri: Platform.OS === 'android'
            ? 'file:///android_asset/src/html/pose.html'
            : `${RNFS.MainBundlePath}/src/html/pose.html`,
          baseUrl: Platform.OS === 'android'
            ? 'file:///android_asset/src/html/'
            : `${RNFS.MainBundlePath}/src/html/`
        }}
        onMessage={handleMessage}
        onLoad={() => setWebViewLoaded(true)}
        onError={(e) => setWebViewError(e.nativeEvent.description)}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        style={{ height: 0, width: 0 }}
      />

      {webViewError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{webViewError}</Text>
        </View>
      )}

      <CameraOverlay
        showControls={showControls}
        isMonitoring={isMonitoring}
        sessionTime={sessionTime}
        postureStatus={postureStatus}
        postureScore={postureScore}
        alertsCount={alertsCount}
        cameraPosition={cameraPosition}
        onBack={() => navigation.goBack()}
        onToggleCamera={() => setCameraPosition(p => p === 'front' ? 'back' : 'front')}
        onToggleControls={() => setShowControls(s => !s)}
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
  errorContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default PostureMonitoringScreen;