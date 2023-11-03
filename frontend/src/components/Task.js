import React, { useState, useEffect,useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { InputGroup, Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const Task = ({ name, description, order, show, handleClose }) => {
  const [commentText, setCommentText] = useState('');
  const [taskDescription, setTaskDescription] = useState(description);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [comments, setComments] = useState([]);
  
  
  
  
  
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/comments/${order}/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      
      const data = await response.json();
      console.log(...data)
      setComments(data); // Update the comments state
    } catch (error) {
      console.error('Error:', error);
    }
  },[order]);
  
  useEffect(()=>{
    fetchComments();
  },[fetchComments]);
  
  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        task_comment: commentText,
        task: order,
        task_name: name,
        sorted_order: order,
      };
      
      fetch('http://localhost:8000/api/addComment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        return response.json();
      })
      .then(() => {
        setComments([...comments, newComment]);
        setCommentText('');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleUpdateDescription = () => {
    // Create an object with the updated description
    const updatedTaskDescription = {
      description: taskDescription,
    };

    const updateDescription = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tasks/${order}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTaskDescription),
        });

        if (!response.ok) {
          throw new Error('Failed to update task description');
        }

        setTaskDescription(updatedTaskDescription.description);
        setIsEditingDescription(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    updateDescription();
  };

  const handleCancelUpdate = () => {
    setTaskDescription(description);
    setIsEditingDescription(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Task: {name} <br />Task Number: {order}
          <br />
          Task Description: {taskDescription}
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
              <Button onClick={() => setIsEditingDescription(true)}>Edit Description</Button>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <ul>
      {comments.map((comment, index) => (
    <li key={index}> {comment.task_comment}</li>
      ))}
  
</ul>

      </Modal.Body>
      <Modal.Footer>
        <div>
          <input
            type="text"
            placeholder="Add a comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button onClick={handleAddComment}>Add Comment</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Task;
