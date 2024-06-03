import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import { TextInput, SafeAreaView, Button, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import tw, { useAppColorScheme } from 'twrnc';
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
    //twrnc hooks to change the color scheme
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);
    
    /*
    Set RTK Query variables
    */
    const [deleteNote] = useDeleteNoteMutation(); 
    const [updateNote] = useUpdateNoteMutation();
    
    //Boolean variable to differentiate between delete by user and delete by empty note
    let isDelete = false;


    /*
    Function to edit text input
    */
    const [title, setTitle] = useState(route.params.data.title);
    const [content, setContent] = useState(route.params.data.content);


    //useRef hooks due to hooks working asynchronously
    const titleRef = useRef(title);
    const contentRef = useRef(content);

    useEffect(() => {
        titleRef.current = title;
        contentRef.current = content;
      }, [title, content]);


    /*
    useRef hooks to make app automatically focus on title input when the screen is loaded 
    And focus on content input when hit enter on title input
    */
    const titleInputRef = useRef(null);
    const focusTitleInput = () => { titleInputRef.current.focus(); }
    useEffect(() => { focusTitleInput(); }, []);

    const contentInputRef = useRef(null);


    /*
    Here is a quite complicated useEffect hook. 
    If the click on the delete button, isDelete will be set to true and the useEffect will be called because the button redirect to the Home page -> call the deleteNote function

    If the note is empty, the app will automatically delete the note. useRef is called because the hooks work asynchronously. (variable are prefference at the time the hook is instanciated)

    Else, auto update note whether if the user edit the note or not.
    */

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {

            //If use click on delete button
            if (isDelete) {
                deleteNote(route.params.data);
                console.log('Note Deleted by User');
            }


            //If the note is empty, delete the note
            else if (titleRef.current == '' && contentRef.current == '') {
                deleteNote(route.params.data);
                console.log('Note Deleted');
            }

            //When note is updated with new title and content
            else {
                updateNote({id: route.params.data.id, title: titleRef.current, content: contentRef.current});
                console.log('Note Updated');
            }

        });

        return unsubscribe;
    }, [navigation]);


    /*
    Creat delete button on the top right navigation bar
    When press button, isDelete is set to false and the app will redirect to the Home page -> call the useEffect hook above.
    */
    const deleteButton = () => {
        return (
            <TouchableOpacity
                style={tw`mr-3`}
                onPress={() => {
                    isDelete = true;
                    navigation.navigate('Home');  
            }} 
            >
                <Text style={tw`text-2xl`}>🗑️</Text>
            </TouchableOpacity>
        );
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                deleteButton()
            ),
            headerStyle: colorScheme === 'light' ? tw`bg-white` : tw`bg-gray-900`,
            headerTitleStyle: colorScheme === 'light' ? tw`text-black` : tw`text-white`,
            headerTintColor: colorScheme === 'light' ? 'black' : 'white',
            headerShadowVisible: false,
        });
    }, [navigation, colorScheme]);


    //Display all components for SingleNote
    return (
        <KeyboardAvoidingView 
            style={tw`flex bg-white h-100vh p-3 dark:bg-gray-900`}
            //Avoid keyboard 
            //Soure from React Native Documentation
            //URL: https://reactnative.dev/docs/keyboardavoidingview
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* Text input for title */}
            <TextInput 
                ref={titleInputRef}   //Focus on text input
                style={tw`text-2xl font-bold my-5 px-3 dark:text-white`}
                placeholder='Untitled'
                placeholderTextColor='gray'
                value = {title}
                onChangeText = {setTitle}
                maxLength={40}
                //When enter is pressed, focus on content input
                onSubmitEditing={() => contentInputRef.current.focus()}
            />

            {/* Text input for content */}
            <TextInput 
                style={[tw`flex-1 text-xl px-3 dark:text-white`, {textAlignVertical: 'top'}]}
                value = {content}
                placeholder='Start writing your note here'
                placeholderTextColor='gray'
                onChangeText={setContent}
                ref = {contentInputRef}
                multiline
            />
            
        </KeyboardAvoidingView> 
    )
}

export default SingleNote