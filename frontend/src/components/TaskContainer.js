import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task'


const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [commentText, setCommentText] = useState('');
 
  const addTask = async () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: `${taskName}-${tasks.length}`,
        name: taskName,
        description: taskDescription,
        sorted_order: tasks.length + 1,
        comments: [],
      };
  
     async function postTask(){ await fetch('http://localhost:8000/api/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          const responseData = response.json();
          console.log('Task saved to database:', responseData);
          setTasks([...tasks, newTask]);
          setTaskName('');
          setTaskDescription('');
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Error:', error);
        });}
        postTask();
      // // Update the local state with the new task
      //  setTasks([...tasks, newTask]);
      //  setTaskName('');
      //  setTaskDescription('');
    }
    
  };
  
const addComment = async (taskIndex) => {
  if (commentText.trim() !== '') {
    const updatedTasks = [...tasks];
    const newComment = {
      task_comment: commentText,
      task_name: updatedTasks[taskIndex].name, // Assuming you want to associate the comment with the task's name
    };

    fetch('http://localhost:8000/api/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment), // Send the newComment object
    })
      .then((response) => {const responseData = response.json();
        console.log('Comment saved to database:', responseData);
        updatedTasks[taskIndex].comments.push(responseData); // Update the local state with the new comment
        setTasks(updatedTasks);
        setCommentText('');
      }).catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
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
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <h1>Task List</h1>
    <h4>Add Tasks Below</h4>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task-list">
        {(provided) => (
      <ul {...provided.droppableProps} ref={provided.innerRef}>
        {tasks.map((task, index) => (
          <Draggable
            key={task.id}
            draggableId={task.id}
            index={index}
          >
           
            {(provided) => (
           
              <ul
              
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <h3>Current Order: {index + 1}</h3>
                <Task
                  key={task.id}
                  name={task.name}
                  description={task.description}
                  comments={task.comments}
                  order= {task.sorted_order}
                  addComment={() => addComment(index)}
                 
                />
              </ul>
            )}
          </Draggable>
        ))}
      </ul>
    )}
          </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default TaskContainer;
