import React, {useEffect, useState} from 'react';
import tw, {useDeviceContext} from 'twrnc';
import NoteBlock from './NoteBlock';
import MasonryList from '@react-native-seoul/masonry-list';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
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
    )

    return (
        <View style={tw`bg-white flex flex-1`}>
            {/* Search box for finding notes */}
            <TextInput
            style={tw`mx-2 my-1 p-2 rounded rounded-3 bg-gray-200 text-lg shadow-md`}
            placeholder="Search"
            onChangeText={handleSearchChange}
            value={search}
            />

            {/* used the searchData RTK hooks to display all the notes
            Create empty React Fragment if searchData is empty
            */}
            {searchData ?
                <MasonryList
                    style={tw`w-full bg-white`}
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