import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
//CSS
import styles from './TaskForm.module.css'
const {AceBase} = require ('acebase')


  
  interface Props {
    btnText: string,
  }
  
  function TaskForm({ btnText, }: Props) {

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('')

  const addTaskHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 1000)
    const db = await AceBase.WithIndexedDB('db', { autoSave: true });
    console.log('iniciado o banco')
    const tasksRef = await db.ref('/tasks');
    tasksRef.set({
      title: { title: title, done: false },
    });
    tasksRef.set()
    console.log(tasksRef)
  }


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    console.log(title)
  }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label>
          <span>Título:</span>
          <input type="text" name='title' placeholder='Título da tarefa' 
          onChange={handleChange}/>
        </label>
      </div>

      <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm