import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Form, Button } from 'react-bootstrap'

import { setNotification } from "../reducers/notificationReducer";

const CreateBlog = ({ createBlog, setOperation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreate = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    createBlog(newBlog);
    dispatch(setNotification(`a new Blog ${title}! by ${author} added`));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
    setOperation(true);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <div style={{marginBottom: 20}} className="formDiv">
        <h2>Create new</h2>
        <Form onSubmit={handleCreate}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="Title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="title"
            />
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="author"
            />
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="url"
            />
            <Button style={{marginTop: 10}} variant="primary" type="submit">
              Create
            </Button>
          </Form.Group>
       </Form>
      </div>
    </>
  );
};

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setSuccessMsg: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
};
export default CreateBlog;
