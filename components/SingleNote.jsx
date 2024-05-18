import React from 'react'
import { TextInput, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';

/**
 * Single Note component
 * -> Ultilize React Naviagtion Route to pass down the title and content
 * Source taken from React Native Documentations
 * URL: https://reactnative.dev/docs/navigation#react-navigation
 * 
 * @param {navigation} -> navigation stack of React Native navigation
 * @param {route} -> route to pass down the title and content similar to documentation example
 * 
 * @returns Single Note component with title and content text input
 */

const SingleNote = ({ navigation, route }) => {
    //If route props is null then set no title
    //-> Will happen when create new note
    if (route.params == null) {
        const [title, onChangeTitle] = React.useState('');
        const [content, onChangeContent] = React.useState('');
    }
    
    
    //useState variables for title and content
    const [title, onChangeTitle] = React.useState(route.params.title);
    const [content, onChangeContent] = React.useState(route.params.content);
    

    return (
        <SafeAreaView style={tw`bg-white h-100vh p-3`}>
            {/* Text input for heading */}
            <TextInput 
                style={tw`text-2xl font-bold my-5`}
                onChangeText={onChangeTitle}
                placeholder='Untitled'
                value = {title}
            />

            {/* Text input for content */}
            <TextInput 
                style={tw`text-xl`}
                onChangeText={onChangeContent}
                value = {content}
            />
            
        </SafeAreaView> 
    )
}

export default SingleNote