import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  addComment,
  delete_Blog,
  updateBlogLike,
} from "../reducers/blogReducer";

const SingleBlog = () => {
  const [commentInput, setCommentInput] = useState("");
  const blogs = useSelector((state) => state.blogs);
  const currentuser = useSelector((state) => state.currentuser);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  const dispatch = useDispatch();

  const increaseLike = () => {
    dispatch(updateBlogLike(id, blog));
  };

  const deleteBlog = () => {
    const confirmation = window.confirm(
      `Remove ${blog.title} by ${blog.author}`
    );
    if (confirmation) {
      dispatch(delete_Blog(id));
    }
  };

  const deleteStyle = {
    color: "red",
  };

  const navigate = useNavigate();

  if (!blog) {
    navigate("/blogs");
  }

  const commentToPost = {
    comment: commentInput,
  };
  const makeComment = () => {
    dispatch(addComment(id, commentToPost));
    setCommentInput("");
  };

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <a>{blog.url}</a>
        <p>
          {blog.likes} likes <button onClick={increaseLike}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {blog.user.id === currentuser.id && (
          <p>
            <button style={deleteStyle} onClick={deleteBlog}>
              delete
            </button>
          </p>
        )}
      </div>
      <div>
        <h1>Comments</h1>
        <input
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
        />
        <button onClick={makeComment}>add comment</button>
        <ul>
          {blog.comments && blog.comments.map((comment) => <li>{comment}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default SingleBlog;
