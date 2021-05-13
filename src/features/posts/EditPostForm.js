import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated } from './postsSlice';

export const EditPostForm = ({ match }) => {
    const postId = match.params.postId;
    const post = useSelector( state => state.posts.posts.find(post => post.id == postId))
    if(post !== undefined){
      return EditPostFormRender(post, postId)
    }
    return (
      <h1>Page Not Found</h1>
)
}

const EditPostFormRender = (post, postId) =>{
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChanged = e => setTitle(e.target.value);
  const onContentChanged = e => setContent(e.target.value);
  const dispatch = useDispatch();
  const history = useHistory();

   const onSavePostClicked = () => {
     console.log('YEEEEAH Save!!')
    if (title && content){
        dispatch(postUpdated({ id: postId, title, content }))
        history.push(`/posts/${postId}`)
    }
  }  

return (
  <section>
    <h2>Edit Post</h2>
    <form>
      <label htmlFor="postTitle">Post Title:</label>
      <input
        type="text"
        id="postTitle"
        name="postTitle"
        placeholder="What's on your mind?"
        value={title}
        onChange={onTitleChanged}
      />
      <label htmlFor="postContent">Content:</label>
      <textarea
        id="postContent"
        name="postContent"
        value={content}
        onChange={onContentChanged}
      />
    </form>
    <button type="button" onClick={onSavePostClicked}>
      Save Post
    </button>
  </section>
)
}