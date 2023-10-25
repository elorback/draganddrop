import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard'; 

const TaskList = ({ tasks}) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard className="d-flex flex-column align-items-center justify-content-center" style={{ padding: '5px' }}
                key = {task.id}
                name={task.name}
                description={task.description}
                comments={task.comments}
                order={task.sorted_order}
                
              />
            </div>
          )}
        </Draggable>
      ))}
    </ul>
  );
};

export default TaskList;
