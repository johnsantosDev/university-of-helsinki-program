/* eslint-disable no-undef */
import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, newobj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newobj, config);
  console.log("response from update", response.data);
  return response.data;
};

const delete_blog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  console.log("respnse: ", response.data);
  return response.data.comment;
};

export default {
  getAll,
  create,
  setToken,
  update,
  delete_blog,
  createComment,
};
