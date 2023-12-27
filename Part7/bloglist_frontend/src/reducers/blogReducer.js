import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlogs(state, action) {
      return [...state, action.payload];
    },
    increaseLike(state, action) {
      const id = action.payload;
      const likeToIncrease = state.find((blog) => blog.id === id);
      const changedBlog = {
        ...likeToIncrease,
        likes: likeToIncrease.likes + 1,
      };

      console.log("changegedBlog: ", changedBlog);
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const stateAfterDelete = state.filter((blog) => blog.id !== id);
      return stateAfterDelete;
    },
    makeComment(state, action) {
      console.log("action payload: ", action.payload);
      const blogId = action.payload.id;
      const comment = action.payload.comment;
      const blogToComment = state.find((blog) => blog.id === blogId);
      const updatedBlog = {
        ...blogToComment,
        comments: blogToComment.comments.concat(comment),
      };
      return state.map((blog) => (blog.id !== blogId ? blog : updatedBlog));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlogs = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(createBlogs(newBlog));
  };
};

export const updateBlogLike = (id, newBlog) => {
  return async (dispatch) => {
    dispatch(increaseLike(id));
    await blogService.update(id, newBlog);
  };
};

export const delete_Blog = (id) => {
  return async (dispatch) => {
    dispatch(deleteBlog(id));
    await blogService.delete_blog(id);
  };
};

export const addComment = (id, com) => {
  return async (dispatch) => {
    const comment = await blogService.createComment(id, com);
    dispatch(makeComment({ id, comment }));
  };
};

export const { setBlogs, createBlogs, increaseLike, deleteBlog, makeComment } =
  blogSlice.actions;
export default blogSlice.reducer;
