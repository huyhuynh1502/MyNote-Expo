import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';

/**
 * Note block component to display the note in the homepage
 * Include the the limitation of numbers of lines in both title and homepage (Android only)
 * @param {item} -> item prop from the MasonryList
 * @param {navigation} -> navigation prop from React Navigation
 * 
 * @returns NoteBlock component with title and content text input
 */

const NoteBlock = ({item, navigation}) => {


    return (
        // TouchableOpacity to make the block clickable and more easy to layout
        <TouchableOpacity 
            style={tw`bg-gray-100 rounded rounded-3 mx-auto w-[92%] my-2 shadow-md`}
            onPress={() => 
                navigation.navigate('SingleNote', {data: item})
            }
        >
            {/* Text display for title */}
            <Text 
            style={tw`text-xl font-bold px-3 py-1`}
            numberOfLines={1}
            >
                {item.title}
            </Text>

            {/* Text display for contents */}
            <Text 
            style={tw`text-lg px-3 py-1`}
            numberOfLines={17}
            >
                {item.content}
            </Text>
            
        </TouchableOpacity>
    )
}

export default NoteBlock