import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Column } from '../Column';
import { ITodo, useTodos } from '../../context/TodoProvider';
import { reOrder } from '../../helpers/reorder';

import styles from './Board.module.scss';

export const Board = () => {
  const { todos = [], setTodos } = useTodos();
  const [progressTodos, setProgressTodos] = useState<ITodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<ITodo[]>([]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    if (sourceDroppableId !== destinationDroppableId) {
      if (sourceDroppableId === 'todo') {
        const selectedItem = todos[result.source.index];
        setTodos(prev => {
          prev.splice(result?.source?.index, 1);
          return prev;
        });
        if (destinationDroppableId === 'progress') {
          setProgressTodos(prev => [...prev, selectedItem]);
        }
        if (destinationDroppableId === 'done') {
          setDoneTodos(prev => [...prev, selectedItem]);
        }
      } else if (sourceDroppableId === 'progress') {
        const selectedItem = progressTodos[result.source.index];
        setProgressTodos(prev => {
          prev.splice(result?.source?.index, 1);
          return prev;
        });
        if (destinationDroppableId === 'todo') {
          setTodos?.(prev => [...prev, selectedItem]);
        }
        if (destinationDroppableId === 'done') {
          setDoneTodos(prev => [...prev, selectedItem]);
        }
      } else if (sourceDroppableId === 'done') {
        const selectedItem = doneTodos[result.source.index];
        setDoneTodos(prev => {
          prev.splice(result?.source?.index, 1);
          return prev;
        });
        if (destinationDroppableId === 'todo') {
          setTodos(prev => [...prev, selectedItem]);
        }
        if (destinationDroppableId === 'progress') {
          setProgressTodos(prev => [...prev, selectedItem]);
        }
      }
    } else {
      if (destinationDroppableId === 'todo') {
        const newItems = reOrder(todos, result.source.index, result.destination.index);
        setTodos(newItems);
      } else if (destinationDroppableId === 'progress') {
        const newItems = reOrder(progressTodos, result.source.index, result.destination.index);
        setProgressTodos(newItems);
      } else {
        const newItems = reOrder(doneTodos, result.source.index, result.destination.index);
        setDoneTodos(newItems);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className={styles.board}>
        <Column columnName="Todos" items={todos} droppableId="todo" />
        <Column columnName="In progress" items={progressTodos} droppableId="progress" />
        <Column columnName="Done" items={doneTodos} droppableId="done" />
      </main>
    </DragDropContext>
  );
};
