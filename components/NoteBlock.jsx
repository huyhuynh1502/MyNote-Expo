import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const title = "";
const content = "";

const NoteBlock = ({title, content}) => {
    return (
        <TouchableOpacity>
            <Text style={tw`text-2xl font-bold`}>{title}</Text>
            <Text style={tw`text-1xl`}>{content}</Text>
        </TouchableOpacity>
    )
}

export default NoteBlock