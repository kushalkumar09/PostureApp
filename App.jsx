import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import WelcomeScreen from './src/screens/Onboarding/WelcomeScreen';
import {storage} from './storage'; 

const Stack = createNativeStackNavigator();

const App = () => {
  const [firstTimeUser, setFirstTimeUser] = useState(null); 

  useEffect(() => {
    const storedValue = storage.getString('firstTimeUser');
    setFirstTimeUser(storedValue !== 'false');
  }, []);

  const onCompleteOnboarding = () => {
    storage.set('firstTimeUser', 'false');
    setFirstTimeUser(false);
  };

  if (firstTimeUser === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={firstTimeUser ? 'Welcome' : 'PostureMonitoring'}>
        <Stack.Screen
          name="Welcome"
          children={(props) => (
            <WelcomeScreen {...props} onComplete={onCompleteOnboarding} />
          )}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CameraPermission"
          component={require('./src/screens/Onboarding/CameraPermissionScreen').default}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HowItWorks"
          component={require('./src/screens/Onboarding/HowItWorksScreen').default}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostureMonitoring"
          component={require('./src/screens/PostureMonitoringScreen').default}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
