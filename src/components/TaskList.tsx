import React from 'react'
import styles from './TaskList.module.css'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
//interface
import { ITask } from './../interfaces/Task';

interface Props {
  taskList: ITask[];
  handleDelete(id:number): void;
  handleEdit(task: ITask): void;
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
    {taskList.length > 0 ? (
    taskList.map(task => (
      <div key={task.id} className={styles.task}>

        <div className={styles.details}>
          <h4>{task.title}</h4>
          <p>Dificuldade: {task.difficulty}</p>
        </div>
        <div className={styles.actions}>
          <ModeEditIcon onClick={() => {handleEdit(task)}}/>
          <DeleteIcon onClick={() => {handleDelete(task.id)}}/>
        </div>
      </div>
    ))
    ) : (
    <p>Digite alguma tarefa para começar!</p>
    )}
    </>
  )
}

export default TaskList