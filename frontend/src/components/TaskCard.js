import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const TaskCard = ({name,order}) =>{
    const [showDetails,setShowDetails] = useState(false);
    
    const handleShowDetails = () =>{
        setShowDetails(!showDetails);
        console.log(showDetails);
    }


    return <>
    <Card>
        <Card.Body>
        <Card.Title> Task: {name}</Card.Title>
        <Card.Header> Task Number: {order}</Card.Header>
        <Button onClick={handleShowDetails}> Show Details </Button>
    </Card.Body>
    </Card>

    </>
};

export default TaskCard;

