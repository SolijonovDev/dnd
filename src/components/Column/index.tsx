import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Item } from '../Item';
import { ITodo } from '../../context/TodoProvider';

import styles from './Todo.module.scss';

interface IColumnProps {
  items: ITodo[];
  columnName: string;
  droppableId: string;
}

export const Column: FC<IColumnProps> = ({ items, columnName, droppableId }) => {
  return (
    <div className={styles.todo}>
      <h2 className={styles.title}>
        {columnName} {items.length}
      </h2>
      <Droppable droppableId={droppableId}>
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
                  >
                    <Item name={item.name} />
                  </div>
                )}
              </Draggable>
            ))}
            {!items.length && <h4>Empty</h4>}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
