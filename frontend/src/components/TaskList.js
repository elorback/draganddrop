import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard'; 

const TaskList = ({tasks}) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <Draggable key={task.strID} draggableId={task.strID} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h3>Current Order: {index+1}</h3>
              <TaskCard className="d-flex flex-column align-items-center justify-content-center" style={{ padding: '5px' }}
                name={task.name}
                id= {task.strID}
                description={task.description}
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
