// TaskContainer.js
import React, { useState } from 'react';
import Task from './Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [commentText, setCommentText] = useState("");

  const addTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        name: taskName,
        description: taskDescription,
        comments: [],
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskDescription('');
    }
  };

  const addComment = (taskIndex) => {
    if (commentText.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].comments.push(commentText);
      setTasks(updatedTasks);
      setCommentText('');
      console.log(commentText)
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <br/>
        <Button onClick={addTask}>Add Task</Button>
      </div>
      {tasks.map((task, index) => (
        <Task
          key={index}
          name={task.name}
          description={task.description}
          comments={task.comments}
          addComment={() => addComment(index)}
        />
        ))}
    </div>
  );
};

export default TaskContainer;
