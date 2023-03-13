import React, { FC, useState } from 'react';

import { Portal } from '../Portal';
import { AddTodoPopup } from '../AddTodoPopup';

import styles from './Header.module.scss';

export const Header: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.header}>
      <h1>Board</h1>
      <button onClick={() => setOpen(true)} className={styles.button}>
        Add todo
      </button>
      <Portal>{open ? <AddTodoPopup handleClose={() => setOpen(false)} /> : null}</Portal>
    </div>
  );
};
