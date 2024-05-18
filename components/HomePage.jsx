/**
 * HomePage.jsx -> Display the homepage of the application
 * Display all the NoteBlock components in a MasonryList
 * Top bar included a search box
 */


import React from 'react';
import tw, {useDeviceContext} from 'twrnc';
import NoteBlock from './NoteBlock';
import MasonryList from '@react-native-seoul/masonry-list';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchBox from './SearchBox';

//Create empty array to hold all Note
let nbs = [];

nbs.push({ title: "Block 1", content: "My first note included lorem ipsum asdfafd" });

nbs.push({ title: "Block 2", content: "Loremsiopsadfafdsfafsffsdff sa df asdfasf asfsadfweaefsdaf" });

nbs.push({ title: "Block 3", content: "Third Note lorem ipsumssadf" });

for (var i = 4; i < 16; i++) {
    nbs.push({ title: `Block ${i}`, content: `Content ${i}` });
}


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
        </>
    )
}

export default HomePage