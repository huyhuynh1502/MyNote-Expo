/**
 * Homepage for the application
 * Wrapped in a SafeAreaView React Native component
 */

import { SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import HomePage from './components/HomePage';
import SingleNote from './components/SingleNote';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Create stack navigator with the Stack Navigator imported from react-navigation
const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>

      {/* Base safe area view -> background layout for the application */}
      <SafeAreaView style={tw`w-full h-100vh bg-gray-100`}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Home screen set to Home */}
            <Stack.Screen name="Home" component={HomePage} options={{title: 'Notes'}} />

            {/* Display SingleNote page when click on a NoteBlock */}
            <Stack.Screen name="SingleNote" component={SingleNote} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  )
}

export default App;
