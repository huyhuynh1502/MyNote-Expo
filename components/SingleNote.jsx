import React from 'react'
import { TextInput, SafeAreaView } from 'react-native';
import tw from 'twrnc';

/**
 * Single Note Component
 * A single page note view with a title and content
 */

const SingleNote = () => {
    //useState variables for title and content
    const [title, onChangeTitle] = React.useState('Heading');
    const [content, onChangeContent] = React.useState('Notes');

    return (
        <SafeAreaView style={tw`m-8`}>
            {/* Text input for heading */}
            <TextInput 
                style={tw`text-2xl font-bold my-5`}
                onChangeText={onChangeTitle}
                value = {title}
            />

            {/* Text input for content */}
            <TextInput 
                style={tw`text-1xl`}
                onChangeText={onChangeContent}
                value = {content}
            />
            
        </SafeAreaView> 
    )
}

export default SingleNote