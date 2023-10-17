import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { InputGroup, Form } from 'react-bootstrap';
import TaskCard from './TaskCard';
import { Modal } from 'react-bootstrap';

const Task = ({ name, description, order, comments }) => {
  const [commentText, setCommentText] = useState('');
  const [taskDescription, setTaskDescription] = useState(description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      setCommentText('');
      comments.push(commentText);
    }
  };

  const handleUpdateDescription = () => {
    setIsEditingDescription(false);
  };

  const handleCancelUpdate = () => {
    setTaskDescription(description);
    setIsEditingDescription(false);
  };


  return (
    <Modal>
      <Modal.Body>
        <div>
          <Modal.Title>Task: {name}</Modal.Title>
          <Modal.Header>Task number: {order}</Modal.Header>
          {isEditingDescription ? (
            <InputGroup>
              <Form.Control
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <Button onClick={handleUpdateDescription}>Save</Button>
              <Button onClick={handleCancelUpdate}>Cancel</Button>
            </InputGroup>
          ) : (
            <div>
              <p>Description: {taskDescription}</p>
              <Button onClick={() => setIsEditingDescription(true)}>Edit Description</Button>
            </div>
          )}
          <br />
          <br />
          <input
            type="text"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            />
          <Button onClick={handleAddComment}>Add Comment</Button>
        </div>
        <ul>
          <Modal.Text>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </Modal.Text>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default Task;
