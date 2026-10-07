import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import SavedServicesScreen from './src/screens/SavedServicesScreen';
import ServicesScreen from './src/screens/ServicesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#262626',
            headerTitleStyle: { color: '#AD1457', fontWeight: '900' },
            contentStyle: { backgroundColor: '#FAFAFA' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Services" component={ServicesScreen} />
          <Stack.Screen name="Saved Services" component={SavedServicesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
