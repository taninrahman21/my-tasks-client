import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/UserContext';

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);
  const {user} = useContext(AuthContext);
  useEffect( () => {
    fetch(`https://my-tasks-server-bice.vercel.app/mytasks?email=${user?.email}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMyTasks(data);
    })
  }, [user?.email])

  const handleDelete = id => {
    fetch(`https://my-tasks-server-bice.vercel.app/tasks/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        const remainingTasks = myTasks.filter(task => task._id !== id);
        setMyTasks(remainingTasks);
        toast.success('Delete Successfully');
      }
    })
  }

  const handleComplete = id => {
    fetch(`https://my-tasks-server-bice.vercel.app/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount > 0){
        const remainingUnCompleteTasks = myTasks.filter(task => task._id !== id);
        setMyTasks(remainingUnCompleteTasks);
      }
    })
  }

  const handleEdit = task => {
    setUpdateTask(task);
  }

  const unCompletedTask = myTasks.filter(task => task?.isCompleted !== true);

  return (
    <div>
     <div className='w-3/5 mx-auto mt-10'>
       {
        unCompletedTask.map(task => <div className='flex justify-between mb-2' key={task._id}>
          <h2 className='text-xl'>{task.title}</h2>
          <div className='text-white'>
          <button onClick={() => handleEdit(task)} className='p-1 bg-green-500 mr-2'>Edit Task</button>
          <button onClick={() => handleComplete(task._id)} className='p-1 bg-green-500 mr-2'>Completed</button>
          <button onClick={() => handleDelete(task._id)} className='p-1 bg-red-500 mr-2'>Delete</button>
          </div>
        </div>)
       }
     </div>
    </div>
  );
};

export default MyTasks;