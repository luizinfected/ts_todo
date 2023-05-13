//css
import styles from './App.module.css'
//components
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

//hooks
import { useEffect, useState } from 'react';


function App() {
  const { AceBase } = require('acebase')

  interface ITask {
    id: string;
    title: string;
  }
  const activate = () => {
    
  }

  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    const loadData = async () => {
      const db = await AceBase.WithIndexedDB('db', { autoSave: true });
      const tasksRef = await db.ref('/tasks');

      // tasksRef.set({ 
      //   'task1': { title: 'Comprar pão', done: false }, 
      //   'task2': { title: 'Fazer exercícios', done: true } 
      // });
      
      // await db.ref('tasks').remove().then(() => {console.log('removido')})

      const tasksDB: ITask[] = []

      await tasksRef.forEach((taskSnapshot: any) => {
        tasksDB.push(taskSnapshot.val() as ITask)
      });

      setTasks(tasksDB)
      console.log(tasks)
    }

    loadData()
  }, []);
 
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText='Criar Tarefa' />
        </div>

        <div>
          <h2>Suas tarefas:</h2>
          <TaskList />
          <ul>
            {tasks && tasks.map(task => (
              <li key={task.id}>
                <p>{task.title}</p>
              </li>
            ))}
          </ul>

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
