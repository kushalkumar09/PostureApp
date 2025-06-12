import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';

const HowItWorksScreen = ({ navigation }) => {
  const handleStartMonitoring = () => {
    // Navigate to the main app screen
    navigation.navigate('PostureMonitoring');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          {/* Lightbulb/Info Icon */}
          <Image
            source={{ uri: 'https://placehold.co/120x120/00CED1/ffffff?text=💡' }} // Dark Turquoise with lightbulb emoji
            style={styles.icon}
          />

          {/* Title */}
          <Text style={styles.title}>How Posture AI Works</Text>

          {/* Step 1 */}
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>1.</Text>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>Real-time Monitoring</Text>
              <Text style={styles.stepDescription}>
                Using your device's camera, Posture AI intelligently monitors your
                body's key points in real-time. Ensure you're in a well-lit area
                with a clear background for best results.
              </Text>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>2.</Text>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>AI Analysis & Detection</Text>
              <Text style={styles.stepDescription}>
                Our advanced AI (powered by TensorFlow) analyzes your posture
                by tracking the positions of your joints and limbs. It identifies
                when your posture deviates from an optimal alignment.
              </Text>
            </View>
          </View>

          {/* Step 3 */}
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>3.</Text>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>Instant, Detailed Feedback</Text>
              <Text style={styles.stepDescription}>
                When poor posture is detected, you'll receive immediate and
                specific feedback, either visually on screen or through voice
                alerts (if enabled), guiding you to correct your position.
              </Text>
            </View>
          </View>

          {/* Step 4 */}
          <View style={styles.stepContainer}>
            <Text style={styles.stepNumber}>4.</Text>
            <View style={styles.stepTextContent}>
              <Text style={styles.stepTitle}>Track Your Progress</Text>
              <Text style={styles.stepDescription}>
                Review daily and weekly summaries of your posture habits. See
                how much time you spend in good posture and identify areas for
                improvement over time.
              </Text>
            </View>
          </View>

          {/* Call to Action Button */}
          <TouchableOpacity style={styles.button} onPress={handleStartMonitoring}>
            <Text style={styles.buttonText}>I Understand! Start Monitoring</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HowItWorksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Add some vertical padding for scrollable content
  },
  content: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 400,
    width: '100%',
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    backgroundColor: '#00CED1', // Dark Turquoise for icon background
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Inter_700Bold',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignSelf: 'stretch', // Allow steps to take full width
    paddingHorizontal: 10,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8a2be2', // Accent color
    marginRight: 15,
  },
  stepTextContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
    fontFamily: 'Inter_600SemiBold',
  },
  stepDescription: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    backgroundColor: '#8a2be2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 30, // Space above the button
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});
