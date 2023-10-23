import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task'
import TaskCard from './TaskCard';


const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [commentText, setCommentText] = useState('');

  
  
  useEffect(() => {
    const fetchAndSetTasks = async () => {
      try {
        const response =  await fetch('http://localhost:8000/api/tasks/');
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        setTasks(data);
       
      } catch (error) {
        console.error('Error: ', error);
      }
    };
  
    fetchAndSetTasks();
  }, []);
  
  const addTask = async () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: `${taskName}-${tasks.length}`,
        name: taskName,
        description: taskDescription,
        sorted_order: tasks.length + 1,
        comments: [],
      };
      
      fetch('http://localhost:8000/api/addTask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
      .then((response) => {
        console.log(response.json())
        setTasks([...tasks, newTask]);
        setTaskName('');
        setTaskDescription('');
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
          console.error('Error:', error);
        });
        
      }
    };
    
    
    const addComment = (taskIndex) => {
      if (commentText.trim() !== '') {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].comments.push(commentText);
        setTasks(updatedTasks);
        setCommentText('');
      }
    };
    
    const onDragEnd = (result) => {
      if (!result.destination) return; // Dropped outside the list
      const reorderedTasks = [...tasks];
      const [reorderedTask] = reorderedTasks.splice(result.source.index, 1);
      reorderedTasks.splice(result.destination.index, 0, reorderedTask);
      setTasks(reorderedTasks);
    };
    

    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{padding:"5px"}}>
      <Card >
  <Card.Body>
      <Card.Title>Task List</Card.Title>
      <Card.Header>Add Tasks Below</Card.Header>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <br />
        <Button onClick={addTask}>Add Task</Button> 
        </Card.Body>
        </Card>
        <div>
   <DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="task-list">
    {(provided) => (
      <ul {...provided.droppableProps} ref={provided.innerRef}>
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <h3>Current Order: {index + 1}</h3>
                <TaskCard
                  key={task.id}
                  name={task.name}
                  description={task.description}
                  comments={task.comments}
                  order={task.sorted_order}
                  addComment={() => addComment(index)}
                />
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    )}
  </Droppable>
</DragDropContext>
</div>
    </Container>
  );

};

export default TaskContainer;
