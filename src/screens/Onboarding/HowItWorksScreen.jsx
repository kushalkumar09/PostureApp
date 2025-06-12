import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions,
  StatusBar
} from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const HowItWorksScreen = ({ navigation }) => {
  const handleStartMonitoring = () => {
    navigation.navigate('PostureMonitoring');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>How Posture AI Works</Text>
        <View style={styles.headerAccent} />
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.introContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>💡</Text>
          </View>
          <Text style={styles.introText}>
            Our AI-powered technology helps you maintain proper posture throughout your day
          </Text>
        </View>
        
        {/* Steps */}
        <View style={styles.stepsContainer}>
          {/* Step 1 */}
          <View style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Real-time Monitoring</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Text style={styles.stepIcon}>📹</Text>
              </View>
              <Text style={styles.stepDescription}>
                Using your device's camera, Posture AI intelligently monitors your
                body's key points in real-time. Ensure you're in a well-lit area
                with a clear background for best results.
              </Text>
            </View>
          </View>
          
          {/* Step 2 */}
          <View style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <Text style={styles.stepTitle}>AI Analysis & Detection</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Text style={styles.stepIcon}>🧠</Text>
              </View>
              <Text style={styles.stepDescription}>
                Our advanced AI (powered by TensorFlow) analyzes your posture
                by tracking the positions of your joints and limbs. It identifies
                when your posture deviates from an optimal alignment.
              </Text>
            </View>
          </View>
          
          {/* Step 3 */}
          <View style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Instant, Detailed Feedback</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Text style={styles.stepIcon}>📊</Text>
              </View>
              <Text style={styles.stepDescription}>
                When poor posture is detected, you'll receive immediate and
                specific feedback, either visually on screen or through voice
                alerts (if enabled), guiding you to correct your position.
              </Text>
            </View>
          </View>
          
          {/* Step 4 */}
          <View style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>4</Text>
              </View>
              <Text style={styles.stepTitle}>Track Your Progress</Text>
            </View>
            <View style={styles.stepContent}>
              <View style={styles.stepIconContainer}>
                <Text style={styles.stepIcon}>📈</Text>
              </View>
              <Text style={styles.stepDescription}>
                Review daily and weekly summaries of your posture habits. See
                how much time you spend in good posture and identify areas for
                improvement over time.
              </Text>
            </View>
          </View>
        </View>
        
        {/* Privacy Note */}
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>
            Your privacy is our priority. All processing happens locally on your device.
          </Text>
        </View>
      </ScrollView>
      
      {/* Footer with CTA Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleStartMonitoring}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start Monitoring</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HowItWorksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  headerAccent: {
    width: 60,
    height: 4,
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra space at bottom for button
  },
  introContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  introText: {
    flex: 1,
    fontSize: 15,
    color: '#1E40AF',
    fontWeight: '500',
    lineHeight: 22,
  },
  stepsContainer: {
    marginBottom: 24,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  stepContent: {
    padding: 20,
    flexDirection: 'row',
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    alignSelf: 'flex-start',
  },
  stepIcon: {
    fontSize: 20,
  },
  stepDescription: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  privacyIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  privacyText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});