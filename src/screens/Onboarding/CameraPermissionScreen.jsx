import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert, 
  Platform, 
  Linking,
  Dimensions 
} from 'react-native';
import React from 'react';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const { width } = Dimensions.get('window');

const CameraPermissionScreen = ({ navigation }) => {
  const handleGrantPermission = async () => {
    const cameraPermissionType = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
      default: null,
    });

    if (!cameraPermissionType) {
      console.log('Camera permission is not supported on this platform.');
      Alert.alert(
        "Platform Not Supported",
        "Camera access is not available on your current device/platform."
      );
      navigation.navigate('Welcome');
      return;
    }

    try {
      const result = await request(cameraPermissionType);
      console.log('Camera Permission Result:', result);

      switch (result) {
        case RESULTS.GRANTED:
          console.log('Camera permission granted! Navigating to Instructions Screen.');
          navigation.navigate('HowItWorks');
          break;

        case RESULTS.DENIED:
          Alert.alert(
            "Permission Denied",
            "Camera permission is required to use the real-time posture analysis feature. Please grant access to proceed."
          );
          break;

        case RESULTS.BLOCKED:
          Alert.alert(
            "Permission Blocked",
            "Camera permission is permanently blocked. Please go to your device settings to enable it manually.",
            [
              { text: "Go to Settings", onPress: () => Linking.openSettings() },
              { text: "Cancel", style: "cancel" }
            ]
          );
          break;

        case RESULTS.LIMITED:
          Alert.alert(
            "Limited Access",
            "You have granted limited access. Full camera access is needed for real-time monitoring. Please review settings."
          );
          break;

        case RESULTS.UNAVAILABLE:
          Alert.alert(
            "Feature Unavailable",
            "This device does not have a camera or the feature is not available."
          );
          navigation.navigate('Welcome');
          break;
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      Alert.alert("Error", "An unexpected error occurred while requesting camera permission.");
      navigation.navigate('Welcome');
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Camera Access?",
      "You can enable camera access later in settings, but some features may be limited.",
      [
        { text: "Go Back", style: "cancel" },
        { text: "Skip", onPress: () => navigation.navigate('HowItWorks') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient Effect */}
      <View style={styles.backgroundGradient} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>Step 1 of 2</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Camera Icon Container */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Text style={styles.cameraIcon}>📸</Text>
          </View>
          <View style={styles.iconRing} />
        </View>

        {/* Title and Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Camera Access</Text>
          <Text style={styles.subtitle}>Enable Smart Posture Detection</Text>
          
          <Text style={styles.description}>
            We need camera access to analyze your posture in real-time and provide 
            personalized feedback. Your privacy is protected - all processing happens 
            locally on your device.
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>100% Private & Secure</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Real-time Analysis</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>Local Processing Only</Text>
          </View>
        </View>
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleGrantPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Allow Camera Access</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={handleSkip}
          activeOpacity={0.6}
        >
          <Text style={styles.secondaryButtonText}>Skip for Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CameraPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#F8FAFF',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  stepIndicator: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#E0E7FF',
    top: -10,
    left: -10,
  },
  cameraIcon: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  featuresList: {
    width: '100%',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
});