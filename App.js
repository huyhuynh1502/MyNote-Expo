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

/**
 * 
 * @returns App component with NavigationContainer and Stack Navigator
 */

function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>

      {/* Base safe area view -> background layout for the application */}
      <SafeAreaView style={tw`w-full h-100vh`}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* Home screen set to Home */}
            <Stack.Screen 
              name="Home" 
              component={HomePage} 
              options={{title: 'Notes'}} 
              backgroudColor='transparent'
            />

            {/* Display SingleNote page when click on a NoteBlock */}
            <Stack.Screen 
              name="SingleNote" 
              component={SingleNote} 
              options={{
                title: 'Your Note'
              }}
              backgroudColor='transparent'
            />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  )
}

export default App;
