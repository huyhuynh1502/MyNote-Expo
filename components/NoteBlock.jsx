/**
 * NoteBlock component -> Display a single note block on the MasonryList
 * onPress will switch to the SingleNote component to edit the note
 */

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';


const NoteBlock = ({title, content, navigation}) => {
    return (
        <TouchableOpacity 
            style={tw`bg-blue-300 p-5 m-3`}
            onPress={() => {
                navigation.navigate('SingleNote', {title: title, content: content})}}
            >
                <Text style={tw`text-2xl font-bold`}>{title}</Text>
                <Text style={tw`text-xl`}>{content}</Text>
        </TouchableOpacity>
    )
}

export default NoteBlock