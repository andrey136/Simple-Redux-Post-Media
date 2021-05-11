import {createSlice, nanoid} from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = {
    posts: [ 
        { 
            id: '1', 
            title: 'First Post!', 
            content: 'Hello!', 
            user: '0', 
            date: sub(new Date(), { minutes: 10 }).toISOString(), 
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0}
            },
        { 
            id: '2', 
            title: 'Second Post', 
            content: 'More text', 
            user: '1', 
            date: sub( new Date(), { minutes: 5 }).toISOString(), 
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            },
        } 
    ],
    status: "idle",
    error: null
}

const postsSlice = createSlice({
    "name" : "posts",
    initialState,
    reducers: {
        reactionAdded: (state, action) => {
            console.log('ACTION', action)
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find( post => post.id == postId )
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        reactionRemoved: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find( post => post.id == postId )
            if (existingPost){
                existingPost.reactions[reaction]--
            }
        },
        postAdded: {
            reducer(state, action){
                state.posts.push(action.payload);
            },
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        date: new Date().toISOString() ,
                        content,
                        user: userId,
                    }
                    
                }
            }
        },
        postUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find(post => post.id == id)
            if(existingPost){
                existingPost.title = title;
                existingPost.content = content
            }
        }
    }
});

export const selectAllPosts = state => state.posts;
export const selectPostById = (state, id) => {
    console.log(state.posts.posts)
    return state.posts.posts.find(post => post.id === id);
}

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer