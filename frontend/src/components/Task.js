// Task.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Task = ({ name, description,order, comments }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      setCommentText('');
      comments.push(commentText);
    }
  };



  return (
    <Card>
    <Card.Body>
      <div>
      <Card.Title>{"Task: " + name}</Card.Title>
      <Card.Header>{"Task number: " + order }</Card.Header>
      <br/>
      <br/>
      <Card.Text>{"Description: " +description}</Card.Text>
      
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
