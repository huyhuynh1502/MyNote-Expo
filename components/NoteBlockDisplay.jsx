import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, View, ScrollView } from 'react-native';
import NoteBlock from './NoteBlock';

let nbs = [];
for (var i = 0; i < 10; i++) {
    nbs.push({ title: `Block ${i}`, content: `Content ${i}` });
}

const NoteBlockDisplay = () => {
  return (
    <>
        <SafeAreaView style={tw`flex`}>
            <ScrollView>
                {nbs.map((nb, index) => (
                    <NoteBlock 
                    key={index} title={nb.title} content={nb.content} />
                ))}
            </ScrollView>
            
        </SafeAreaView>
    </>
  )
}

export default NoteBlockDisplay