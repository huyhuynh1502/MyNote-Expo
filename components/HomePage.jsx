import React, {useEffect, useState} from 'react';
import tw, {useDeviceContext} from 'twrnc';
import NoteBlock from './NoteBlock';
import MasonryList from '@react-native-seoul/masonry-list';
import { Text, TouchableOpacity, View } from 'react-native';
import SearchBox from './SearchBox';
import { useFetchNotesQuery, useAddNoteMutation, useSearchNotesQuery, useDeleteNoteMutation } from '../db';


/**
 * Home Page component: Display all notes in a masonry list
 * 
 * @param {navigation} navigation prop from React Navigation
 * 
 * @returns 
 *  SearcBox -> search notes
 *  MasonryList of NoteBlocks
 *  TouchableOpacity -> Floating button to add new note
 */

const HomePage = ({ navigation }) => {
    //Use searchNotesQuery to fetch notes
    const {data: searchData, error, isLoading} = useSearchNotesQuery('');

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
            item = {item}
            navigation={navigation}
        />
    )

    return (
        <View style={tw`bg-white flex flex-1`}>
            <SearchBox />

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
                style={tw`absolute w-12 h-12 justify-center items-center right-5 bottom-5 bg-gray-600 rounded-full`}

                onPress={() => {
                    addNote({title: '', content: ''});
                }}
            >
                <Text style={tw`text-xl text-white`}>
                    {/* Need to implement icon library */}
                    ADD
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomePage