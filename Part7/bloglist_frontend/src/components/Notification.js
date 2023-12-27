import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = ({ operation }) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const failStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const notification = useSelector((state) => state.notification);
  console.log("notification: ", notification);

  if (notification.message === null) {
    return null;
  }

  return (
    <>
      {operation ? (
        <Alert variant="success">{notification.message}</Alert>
      ) : (
        <Alert variant="danger">{notification.message}</Alert>
      )}
    </>
  );
};

export default Notification;
