import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButton } from './ReactionButtons';
import { selectAllPosts } from './postsSlice';
// import { selectAllPosts, fetchPosts } from './postsSlice';


export const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    // console.log(posts, 'PostsList.js')
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (postStatus === 'idle'){
    //         dispatch(fetchPosts())
    //     }
    // }, [postStatus, dispatch])

    let content

    if (postStatus === 'loading'){
        content = <div className="loader">Loading...</div>
    }
    
    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <p><PostAuthor userId={post.user}/></p>
            <ReactionButton post={post}/>
            <Link to={`/posts/${post.id}`} Locat className="button muted-button">
                View Post
            </Link>

        </article>
        )
    )
        return(
            <section className="posts-list">
                <h2>Posts</h2>
                {renderedPosts}
            </section>
        )
}
