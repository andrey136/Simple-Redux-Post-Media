import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { client } from '../../api/client'

const initialState = {
    postsList: [ 
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

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await client.get('/fakeApi/posts');
//     return response.posts
// })

const postsSlice = createSlice({
    "name" : "posts",
    initialState,
    reducers: {
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            console.log(state.postsList)
            const existingPost = state.posts.postsList.find( post => post.id == postId )
            console.log('REACTION REDUCER: ', existingPost);
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        reactionRemoved: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.postsList.find( post => post.id == postId )
            if (existingPost){
                existingPost.reactions[reaction]--
            }
        },
        postAdded: {
            reducer(state, action){
                state.posts.postsList.push(action.payload);
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
            const existingPost = state.posts.postsList.find(post => post.id == id)
            if(existingPost){
                existingPost.title = title;
                existingPost.content = content
            }
        }
    },
    // extraReducers: {
    //     [fetchPosts.pending]: (state, action) => {
    //         state.posts.status = 'loading'
    //     },
    //     [fetchPosts.fulfilled]: (state, action) => {
    //         state.posts.status = 'succeeded'
    //         state.posts.posts.concat(action.payload)
    //     },
    //     [fetchPosts.rejected]: (state, action) => {
    //         state.props.state = 'failed',
    //         state.posts.error = action.error.message
    //     }
    // }
});

export const selectAllPosts = state => state.posts.postsList;
export const selectPostById = (state, id) => {
    return state.posts.postsList.find(post => post.id === id);
}

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer