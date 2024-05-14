import { SafeAreaView, Text, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-reanimated'; 
import SingleNote from './components/SingleNote';
import NoteBlock from './components/NoteBlock';

function App() {
  useDeviceContext(tw);

  return (
    <Provider store={store}>
      <SafeAreaView style={tw`w-full h-100vh bg-gray-100`}>
        <SingleNote />
      </SafeAreaView>
    </Provider>
  )
}

export default App;
