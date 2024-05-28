/**
 * NoteBlock component -> Display a single note block on the MasonryList
 * onPress will switch to the SingleNote component to edit the note
 */

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';


const NoteBlock = ({item, navigation}) => {


    return (
        // TouchableOpacity to make the block clickable and more easy to layout
        <TouchableOpacity 
            style={tw`bg-gray-100 rounded rounded-3 mx-auto w-[92%] my-2`}
            onPress={() => 
                navigation.navigate('SingleNote', {data: item})
            }
        >

            <Text 
            style={tw`text-xl font-bold px-3 py-1`}
            numberOfLines={1}
            >
                {item.title}
            </Text>
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