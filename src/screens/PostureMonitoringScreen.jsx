'use client';

import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  Platform,
  View,
  Text,
  Button,
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
import {usePostureMonitoring} from '../hooks/usePostureMonitoring';
import CameraView from '../components/CameraView';

const PostureMonitoringScreen = ({navigation}) => {
  // State and refs
  const [webViewError, setWebViewError] = useState(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const cameraRef = useRef(null);
  const webviewRef = useRef(null);

  const webViewSource = {
    uri:
      Platform.OS === 'android'
        ? 'file:///android_asset/src/html/pose.html'
        : `${RNFS.MainBundlePath}/src/html/pose.html`,
    baseUrl:
      Platform.OS === 'android'
        ? 'file:///android_asset/src/html/'
        : `${RNFS.MainBundlePath}/src/html/`,
  };

  // Camera hooks
  const devices = useCameraDevices();
  const {hasPermission, requestPermission} = useCameraPermission();

  // State management
  const [chosenCameraDevice, setChosenCameraDevice] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('front');
  const [showControls, setShowControls] = useState(true);
  const [postureData, setPostureData] = useState(null);

  // Posture monitoring
  const {
    isMonitoring,
    sessionTime,
    postureStatus,
    postureScore,
    alertsCount,
    handleStartStop,
  } = usePostureMonitoring(postureData);

  const handleMessage = useCallback(async event => {
    try {
      const data = await JSON.parse(event.nativeEvent.data);
      console.log('WebView message received:', data);

      console.log('Received from WebView:', {
        type: data.type,
        timestamp: data.timestamp,
        message: data.message,
        from: data.from,
      });

      // Handle different message types
      switch (data.type) {
        case 'log':
          console.log('[WebView log]', data.message);
          break;

        case 'posture_analysis':
          // Process pose data with timestamp
          console.log('[WebView pose data]', data);
          setPostureData(() => data.posture);
          break;

        case 'ready':
          console.log('WebView model loaded successfully');
          setWebViewLoaded(true);

        case 'ping':
          console.log('WebView ping received');
          break;

        case 'error':
          console.error('[WebView Error]', data.message);
          setWebViewError(data.message);
          break;

        default:
          console.log('Unknown WebView message:', data);
      }
    } catch (error) {
      console.error('Message parsing error:', error);
      setWebViewError('Failed to parse WebView message');
    }
  }, []);

  const captureAndSendPhoto = async () => {
    try {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'speed',
        skipMetadata: true,
      });

      console.log('Photo taken:', photo);

      const path = photo.path;
      const base64 = await RNFS.readFile(path, 'base64');

      const message = {
        command: 'predict',
        image: `data:image/jpeg;base64,${base64}`,
        from: 'sending photo',
      };
      console.log('Sending photo to WebView');
      webviewRef.current.postMessage(JSON.stringify(message));
      console.log('Photo sent to WebView');
    } catch (error) {
      console.warn('Photo error:', error);
    }
  };

  // Camera setup and permission handling
  useEffect(() => {
    let interval;
    if (isMonitoring && webViewLoaded && cameraRef.current) {
      interval = setInterval(() => {
        console.log('📸 Sending frame to WebView...');
        captureAndSendPhoto();
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring, webViewLoaded, cameraRef]);

  useEffect(() => {
    const setupCamera = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Camera Access Required',
            'Please enable camera access in settings',
            [
              {text: 'Settings', onPress: Linking.openSettings},
              {text: 'Cancel', onPress: () => navigation.goBack()},
            ],
          );
          return;
        }
      }

      const device =
        devices.find(d => d.position === cameraPosition) || devices[0];
      if (device) {
        setChosenCameraDevice(device);
        setIsCameraActive(true);
      }
    };
    setupCamera();
  }, [hasPermission, devices, cameraPosition]);

  if (!chosenCameraDevice || !hasPermission) {
    return <LoadingScreen onRetry={requestPermission} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={chosenCameraDevice}
        isActive={isCameraActive}
      />

      <WebView
        ref={webviewRef}
        source={webViewSource}
        onMessage={handleMessage}
        onLoad={() => setWebViewLoaded(true)}
        onError={e => setWebViewError(e.nativeEvent.description)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={{height: 1, width: 1}}
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
        postureData={postureData} // ✅ pass here
        alertsCount={alertsCount}
        cameraPosition={cameraPosition}
        onBack={() => navigation.goBack()}
        onToggleCamera={() =>
          setCameraPosition(p => (p === 'front' ? 'back' : 'front'))
        }
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
