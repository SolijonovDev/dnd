import React, { FC, useState } from 'react';
import { useTodos } from '../../context/TodoProvider';

import styles from './AddTodoPopup.module.scss';

interface IAddTodoPopupProps {
  handleClose: () => void;
}

export const AddTodoPopup: FC<IAddTodoPopupProps> = ({ handleClose }) => {
  const { addTodo } = useTodos();
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCancel = () => {
    setInputValue('');
    handleClose();
  };

  const handleAddTodo = () => {
    if (!inputValue.length) return;
    setInputValue('');
    handleClose();
    addTodo?.(inputValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.contain}>
        <h2 className={styles.title}>Add todo</h2>
        <input
          autoFocus
          value={inputValue}
          placeholder="New todo"
          onKeyPress={handleKeyPress}
          onChange={handleChange}
        />
        <div className={styles.btns}>
          <button disabled={!inputValue.length} onClick={handleAddTodo} className={styles.button}>
            Add
          </button>
          <button onClick={handleCancel} className={styles.button}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
