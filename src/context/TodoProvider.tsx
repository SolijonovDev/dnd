import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { nanoid } from 'nanoid';

export interface ITodo {
  id: string;
  name: number | string;
}

interface IContext {
  todos?: ITodo[];
  addTodo?: (value: string) => void;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

const TodoContext = createContext<IContext>({ setTodos: (action: any) => undefined });

interface ITodoProviderProps {
  children: ReactNode;
}

export const initialState: ITodo[] = [
  { id: '1', name: 'React' },
  { id: '2', name: 'Vue' },
  { id: '3', name: 'Angular' },
];

export const TodoProvider: FC<ITodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>(initialState);

  const addTodo = (name: string) => {
    const newTodo = { id: nanoid(), name };
    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, setTodos }}>{children}</TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
