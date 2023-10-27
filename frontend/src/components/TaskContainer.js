import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container } from 'react-bootstrap';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks/');
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      const taskswithID = data.map((task,strID)=>({...task,id:strID}))

  
      setTasks(taskswithID);
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  
  const addTask = async () => {
    if (taskName.trim() !== '') {
      const newTask = {
        strID: `${taskName}:${tasks.length}`,
        name: taskName,
        description: taskDescription,
        sorted_order: `${tasks.length + 1}`,
      };
  
      fetch('http://localhost:8000/api/addTask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add task'); // Throw an error when the response is not ok
          }
          return response.json(); // Return the JSON data from the response
        })
        .then((data) => {
         // Update the new task's ID with the server-provided ID
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
  

  const onDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list
    const reorderedTasks = [...tasks];
    const [reorderedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedTask);
    setTasks(reorderedTasks);
  };

  return (<>
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ padding: '5px' }}>
      <Card>
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
                <TaskList tasks={tasks} />
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
            </Container>
      </>  );
};

export default TaskContainer;
