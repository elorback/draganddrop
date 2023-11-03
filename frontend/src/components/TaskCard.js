import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Task from './Task';

const TaskCard = ({ id, name, description, order }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = () => {
    setShowModal(true);
  };
  

  return (
    <>
      {showModal ? (
        <Task
          id ={id}
          name={name}
          description={description}
          order={order}
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Task: {name}</Card.Title>
            <Card.Header>Task Number: {order}</Card.Header>
            <Button onClick={handleShowDetails}>Show Details</Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default TaskCard;
