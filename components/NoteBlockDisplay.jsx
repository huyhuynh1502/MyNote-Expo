import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, View, ScrollView, FlatList } from 'react-native';
import NoteBlock from './NoteBlock';

let nbs = [];

nbs.push({ title: "Block 10", content: "Loremsiopsadfafdsfafsffsdff sa df asdfasf" });
for (var i = 0; i < 10; i++) {
    nbs.push({ title: `Block ${i}`, content: `Content ${i}` });
}



const NoteBlockDisplay = () => {
  return (
    <>
        <SafeAreaView style={tw`flex-1`}>
            <FlatList
                data={nbs}
                renderItem={({ item }) => (
                    <View style={tw``}>
                        <NoteBlock 
                        title={item.title} 
                        content={item.content} 
                    />
                    </View>
                    
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
    </SafeAreaView>
    </>
  )
}

export default NoteBlockDisplay