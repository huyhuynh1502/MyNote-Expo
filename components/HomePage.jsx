/**
 * HomePage.jsx -> Display the homepage of the application
 * Display all the NoteBlock components in a MasonryList
 * Top bar included a search box
 */


import React from 'react';
import tw, {useDeviceContext} from 'twrnc';
import NoteBlock from './NoteBlock';
import MasonryList from '@react-native-seoul/masonry-list';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchBox from './SearchBox';

//Create empty array to hold all Note
let nbs = [];

const HomePage = ({ navigation }) => {
    /**
     * First render all the notes from the array
     * Then display inside a MasonryList
     * @param { navigation } -> props from navigation stack and then passed down to NoteBlock
     * @returns 
     */
    const renderItem = ({ item }) => (      
        <NoteBlock 
            title={item.title} 
            content={item.content} 
            navigation={navigation}
        />
    )


    return (
        <>
            <SearchBox />

            {/* Ultilize Masonry List import */}
            <MasonryList
                style={tw`w-full bg-white`}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1}
                data={nbs}
                renderItem={renderItem}
                numColumns={2}
            />

            {/* Floating button to add new note */}
            <TouchableOpacity 
                style={tw`absolute w-12 h-12 justify-center items-center right-5 bottom-5 bg-gray-600 rounded-full`}
                onPress={() => {
                    // onPress logic -> to be implemented
                }}
                >
                <Text style={tw`text-xl text-white`}>
                    {/* Need to implement icon library */}
                    ADD
                </Text>
            </TouchableOpacity>
        </>
    )
}

export default HomePage