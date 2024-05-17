import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const title = "Test Heading";
const content = "Test Content";

const NoteBlock = ({title, content}) => {
    return (
        <TouchableOpacity style={tw`bg-blue-300 p-5 m-3`}>
            <Text style={tw`text-2xl font-bold`}>{title}</Text>
            <Text style={tw`text-xl`}>{content}</Text>
        </TouchableOpacity>
    )
}

export default NoteBlock