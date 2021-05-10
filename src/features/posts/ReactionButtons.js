import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

export const ReactionButton = ({ post }) => {
//     if (post !== undefined){
    const dispatch = useDispatch();
    // const addReaction = (reactionName) => {
    //     return reactionAdded({
    //         postId : post.id,
    //         reaction: reactionName,
    //     })
    // }
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name} type="button" className="muted-button reaction-button"
            onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}>
                 {emoji} {post.reactions[name]}
            </button>
        )
    })
    console.log(post, 'reactionButtons')

    return <div>{reactionButtons}</div>

    // return <div>{reactionButtons}</div>
    
}