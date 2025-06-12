import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {formatTime} from '../utils/TimeUtils.jsx';

const TopBar = ({
  isMonitoring,
  sessionTime,
  cameraPosition,
  onBack,
  onToggleCamera,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>

      <View style={styles.sessionInfo}>
        {isMonitoring && (
          <>
            <Text style={styles.sessionTimeLabel}>Session</Text>
            <Text style={styles.sessionTimeValue}>
              {formatTime(sessionTime)}
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.cameraToggleButton}
        onPress={onToggleCamera}>
        <Text style={styles.cameraToggleText}>🔄</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start', // optional: controls layout inside parent
  },

  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sessionInfo: {
    alignItems: 'center',
  },
  sessionTimeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
  sessionTimeValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraToggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraToggleText: {
    fontSize: 18,
  },
});

export default TopBar;
