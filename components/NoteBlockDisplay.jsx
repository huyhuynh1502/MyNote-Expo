import React from 'react';
import tw, {useDeviceContext} from 'twrnc';
import NoteBlock from './NoteBlock';
import MasonryList from '@react-native-seoul/masonry-list';
import { Text } from 'react-native';


let nbs = [];

nbs.push({ title: "Block 10", content: "Loremsiopsadfafdsfafsffsdff sa df asdfasf" });

nbs.push({ title: "Block 11", content: "Loremsiopsadfafdsfafsffsdff sa df asdfasf asfsadfweaefsdaf" });

nbs.push({ title: "Block 12", content: "Loremsiopsadfafdsfafsffsdff s" });

for (var i = 0; i < 10; i++) {
    nbs.push({ title: `Block ${i}`, content: `Content ${i}` });
}

const renderItem = ({ item }) => (      
    <NoteBlock 
        title={item.title} 
        content={item.content} 
    />
)


const NoteBlockDisplay = () => {
  return (
    <>
        <MasonryList
            style={tw`w-full`}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            data={nbs}
            renderItem={renderItem}
            numColumns={2}
        />
    </>
  )
}

export default NoteBlockDisplay