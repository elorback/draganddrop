// Task.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container} from 'react-bootstrap';
const Task = ({ name, description, comments }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      setCommentText('');
      comments.push(commentText);
    }
  };



  return (
    <Container>
      <h3>{name}</h3>
      <p>{description}</p>
      <div>
        <input
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button onClick={handleAddComment}>Add Comment</Button>
      </div>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Task;
