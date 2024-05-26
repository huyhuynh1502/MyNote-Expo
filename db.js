import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * db.js created by Allan Lavell
 * Comments added in this project to help further understand the code
 * Note: No modification has been made to the code accept for added comments
 */

// Create a new API using createApi
// API endpoint acted as a way to interact with the database
export const dbApi = createApi({
  reducerPath: 'dbApi',
  tagTypes: ['Notes'],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    fetchNotes: build.query({
      async queryFn() {
        const serializedNotes = await AsyncStorage.getItem('notes');
        const notes = JSON.parse(serializedNotes);

        return { data: [notes] }
      },
      providesTags: (result) => ['Notes']
    }),

    //ASSUME: This is the search function for the notes
    searchNotes: build.query({
      async queryFn(searchString) {
        const serializedNotes = await AsyncStorage.getItem('notes');

        const notes = JSON.parse(serializedNotes);
        
        if (searchString == "") { 
          return { data: notes }
        } else {
          const filteredNotes = notes.filter(note => {
            const { title, content } = note;
            const s = searchString.toLowerCase();
            return title.toLowerCase().indexOf(s) !== -1 || content.toLowerCase().indexOf(s) !== -1;
          });

          return { data: filteredNotes || [] }
        }
      }, 
      providesTags: (result) => ['Notes']
    }),

    //ASSUME: This is the add note function
    addNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem('notes');
        const notes = JSON.parse(serializedNotes) || [];
        note.id = uuid.v4();
        notes.unshift(note);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        return { data: note }
      },
      invalidatesTags: ['Notes'],
    }),

    //ASSUME: This is the delete note function
    deleteNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem('notes');
        let notes = JSON.parse(serializedNotes) || [];
        notes = notes.filter(x => x.id !== note.id);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        return { data: note };
      },
      invalidatesTags: ['Notes'],
    }),

    //ASSUME: This is the update note function
    updateNote: build.mutation({
      async queryFn(note) {
        const serializedNotes = await AsyncStorage.getItem('notes');
        const notes = JSON.parse(serializedNotes) || [];
        const updatedNotes = notes.map((n) => {
          if (n.id === note.id) {
            return { ...n, title: note.title, content: note.content };
          }
          return n;
        });
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        return { data: note }
      },
      invalidatesTags: ['Notes'],
    }),
  }),
})

//Export all the functions from the dbApi
export const { useFetchNotesQuery, useSearchNotesQuery, useAddNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = dbApi