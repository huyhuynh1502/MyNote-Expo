import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import { TextInput, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { useUpdateNoteMutation, useDeleteNoteMutation } from '../db';

/**
 * Single Note component
 * -> Ultilize React Naviagtion Route to pass down the title and content
 * Source taken from React Native Documentations
 * URL: https://reactnative.dev/docs/navigation#react-navigation
 * 
 * @param {navigation} -> navigation stack of React Native navigation
 * @param {route} -> route to pass down the title and content similar to documentation example
 * 
 * @returns Single Note component with title and content text input that been dynamically updated from database
 */

const SingleNote = ({ navigation, route }) => {
    /*
    Function to edit text input
    */
    const [title, setTitle] = useState(route.params.data.title);
    const [content, setContent] = useState(route.params.data.content);

    console.log(title);
    console.log(content);

    /*
    Set RTK Query variables
    */
    const [deleteNote] = useDeleteNoteMutation(); 
    const [updateNote] = useUpdateNoteMutation();

    /*
    useRef hooks to make app automatically focus on title input when the screen is loaded 
    And focus on content input when hit enter on title input
    */
    const titleInputRef = useRef(null);
    const focusTitleInput = () => { titleInputRef.current.focus(); }
    useEffect(() => { focusTitleInput(); }, []);

    const contentInputRef = useRef(null);


    /*
    Auto save when the user go back to the previous screen (home screen)
    */
    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            //If the note is empty, delete the note
            if (title == '' && content == '') {
                deleteNote(route.params.data);
                console.log('Note Deleted');
            }

            //When note is updated with new title and content
            else {
                updateNote({id: route.params.data.id, title: title, content: content});
                console.log('Note Updated');
            }

        });

        return unsubscribe;
    }, [navigation]);


    

    return (
        <SafeAreaView style={tw`bg-white h-100vh p-3`}>
            {/* Text input for title */}
            <TextInput 
                ref={titleInputRef}   //Focus on text input
                style={tw`text-2xl font-bold my-5`}
                placeholder='Untitled'
                placeholderTextColor='gray'
                value = {title}
                onChangeText = {setTitle}
                //When enter is pressed, focus on content input
                onSubmitEditing={() => contentInputRef.current.focus()}
            />

            {/* Text input for content */}
            <TextInput 
                style={tw`text-xl`}
                value = {content}
                placeholder='Start writing your note here'
                placeholderTextColor='gray'
                onChangeText={setContent}
                ref = {contentInputRef}
            />
            
        </SafeAreaView> 
    )
}

export default SingleNote