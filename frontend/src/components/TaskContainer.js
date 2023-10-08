import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task'


const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [commentText, setCommentText] = useState('');
 

  const addTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: `${taskName}-${tasks.length}`, // Assignn a unique ID to each task
        name: taskName,
        description: taskDescription,
        order: tasks.length +1,
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
    <div>
      <div>
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
      </div>

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
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Task
                        key={task.id}
                        name={task.name}
                        description={task.description}
                        comments={task.comments}
                        order= {task.order}
                        addComment={() => addComment(index)}
                       
                      />
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskContainer;
