import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface ITodoProps {
  items: any[];
}

import styles from './Todo.module.scss';
import { Item } from '../Item';

export const Todo: FC<ITodoProps> = ({ items }) => {
  return (
    <div className={styles.todo}>
      <h2 className={styles.title}>Todos {items.length}</h2>
      <Droppable droppableId="todo">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.droppable}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.item}
                    //snapshot.isDragging
                  >
                    <Item name={item.name} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
