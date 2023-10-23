import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { InputGroup, Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

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
    <Card>
      <Card.Body>
        <div>
          <Card.Title>Task: {name}</Card.Title>
          <Card.Header>Task number: {order}</Card.Header>
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
          <Card.Text>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </Card.Text>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Task;
