import React, { FC } from 'react';

interface IItemProps {
  name: string | number | undefined;
}

import styles from './Item.module.scss';

export const Item: FC<IItemProps> = ({ name }) => {
  return <div className={styles.item}>{name}</div>;
};
