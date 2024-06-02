import React, {useEffect, useState} from 'react';
import tw, {useDeviceContext, useAppColorScheme } from 'twrnc';
import NoteBlock from './NoteBlock';
import MasonryList from '@react-native-seoul/masonry-list';
import { Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { useAddNoteMutation, useSearchNotesQuery, useDeleteNoteMutation } from '../db';

/**
 * Home Page component: Display all notes in a masonry list
 * 
 * @param {navigation} navigation prop from React Navigation
 * 
 * @returns 
 * MasonryList of NoteBlocks
 * TouchableOpacity -> Floating button to add new note
 */

const HomePage = ({ navigation }) => {
    /**
    * This function is quite complicated. Here, instead of using useFetchNoteQuery, we use searchNotesQuery to fetch notes.
    * This create a dynamic display when the user search for a note.
    */ 
    //Use searchNotesQuery to fetch notes and useState to change search value
    const [search, setSearch] = useState('');
    const {data: searchData, error, isLoading} = useSearchNotesQuery(search);
    const handleSearchChange = (value) => {
        setSearch(value);
    }

    //Create addNote mutation with aliasing
    const [addNote, {data: addNoteData, error: addNoteError}] = useAddNoteMutation();

    //Navigate to SingleNote when addNoteData is call (useEffect)
    useEffect(() => {
        if (addNoteData != undefined) {
            console.log(addNoteData.title);
            navigation.navigate('SingleNote', {data: addNoteData});
        }
    }, [addNoteData]);  


    //Function to render NoteBlock with MasonryList prop
    const renderItem = ({ item }) => (      
        <NoteBlock 
            item = { item }
            navigation={ navigation }
        />
    );

    /*
    Create a useState for lightMode to change the theme of the app.
    2 function to that return TouchableOpacity with emoji to change the theme.
    */
    const [lightMode, setLightMode] = useState(true);

    //twrnc hooks to change the color scheme
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

    const toDarkModeButton = () => {
        return (
            <TouchableOpacity
                style={tw`ml-3`}
                onPress={() => {
                    setLightMode(false);
                    toggleColorScheme();
                }}
            >
                <Text style={tw`text-2xl`}>🌑</Text>
            </TouchableOpacity>
        );
    }

    const toLightModeButton = () => {
        return (
            <TouchableOpacity
                style={tw`ml-3`}
                onPress={() => {
                    setLightMode(true);
                    toggleColorScheme();
                }}
            >
                <Text style={tw`text-2xl`}>☀️</Text>
            </TouchableOpacity>

        );
    }

    //Add theme button to the header
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                lightMode ? toDarkModeButton() : toLightModeButton()
            ),
        });
    }, [navigation, lightMode, colorScheme]);


    //Display all components for HomePage
    return (
        <View style={tw`bg-white flex flex-1 dark:bg-gray-900`}>
            {/* Search box for finding notes */}
            <TextInput
            style={tw`mx-2 my-1 p-2 rounded rounded-3 bg-gray-200 text-lg shadow-md 
            dark:bg-gray-700 dark:text-white`}
            placeholder="Search"
            onChangeText={handleSearchChange}
            value={search}
            />

            {/* used the searchData RTK hooks to display all the notes
            Create empty React Fragment if searchData is empty
            */}
            {searchData ?
                <MasonryList
                    style={tw`w-full bg-white
                    dark:bg-gray-900`}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    data={searchData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                />
                : <></>
            }

            {/* Floating button to add new note */}
            <TouchableOpacity 
                style={tw`absolute w-13 h-13 justify-center items-center right-5 bottom-5 bg-gray-500 rounded-full shadow-lg`}

                onPress={() => {
                    addNote({title: '', content: ''});
                }}
            >
                <Text style={tw`text-xl text-white text-3xl mb-2`}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomePage