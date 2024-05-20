import React, {useEffect, useState} from 'react'
import { TextInput, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { useAddNoteMutation, useUpdateNoteMutation } from '../db';

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
    /*
    Use state section -> use for dynamic UI title and content edit
    */
    const [title, onChangeTitle] = React.useState(route.params ? route.params.title : '');

    const [content, onChangeContent] = React.useState(route.params ? route.params.content  : '');
    

    /*
    useEffect section -> use for dynamic database update
    */
    const [addNote] = useAddNoteMutation();
    const [updateNote] = useUpdateNoteMutation();
    //Dynamic add and edit from database 
    //Will be call when ever title or content is updated
    React.useEffect(() => {
        const saveNote = async () => {
            // If the note already exists
            if (route.params && route.params.id) { 

                await updateNote({ id: route.params.id, title, content });
            } 
            // If the note is new
            else { 
                await addNote({ title, content });
            }
        };

        saveNote();
    }, [title, content, addNote, updateNote]);


    return (
        <SafeAreaView style={tw`bg-white h-100vh p-3`}>
            {/* Text input for heading */}
            <TextInput 
                style={tw`text-2xl font-bold my-5`}
                onChangeText={text => onChangeTitle(text)}
                placeholder='Untitled'
                value = {title}
            />

            {/* Text input for content */}
            <TextInput 
                style={tw`text-xl`}
                onChangeText={text => onChangeContent(text)}
                value = {content}
            />
            
        </SafeAreaView> 
    )
}

export default SingleNote