import React, { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
  children: ReactNode;
}

let modalRoot: any = null;

export const Portal: FC<IPortalProps> = ({ children }) => {
  useEffect(() => {
    modalRoot = document.getElementById('modal-root');
  }, []);

  return modalRoot ? createPortal(children, modalRoot) : null;
};
