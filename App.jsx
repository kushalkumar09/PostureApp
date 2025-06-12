import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet} from 'react-native'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen
          name='Welcome'
          component={require('./src/screens/Onboarding/WelcomeScreen').default}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='CameraPermission'
          component={require('./src/screens/Onboarding/CameraPermissionScreen').default}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default App

const styles = StyleSheet.create({})