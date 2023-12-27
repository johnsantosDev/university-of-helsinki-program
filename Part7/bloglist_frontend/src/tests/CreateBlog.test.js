import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import CreateBlog from "../components/CreateBlog";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<CreateBlog createBlog={createBlog} />);

  const input = screen.getByPlaceholderText("title");
  const sendButton = screen.getByText("Create");

  await user.type(input, "new blog");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("new blog");
});
