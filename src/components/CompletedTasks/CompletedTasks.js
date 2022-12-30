import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [tasksLoading, setTaskLoading] = useState(true);
  const {user} = useContext(AuthContext);
  useEffect( () => {
    fetch(`https://my-tasks-server-bice.vercel.app/mytasks?email=${user?.email}`)
    .then(res => res.json())
    .then(data => {
      setTaskLoading(false);
      const completedTasks = data.filter(task => task?.isCompleted === true);
      setCompletedTasks(completedTasks);
    })
  }, [user?.email])

  if(tasksLoading){
    return <p className='text-center mt-20 text-xl'>Loading...</p>
  }

  const handleDelete = id => {
    fetch(`https://my-tasks-server-bice.vercel.app/tasks/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        const remainingTasks = completedTasks.filter(task => task._id !== id);
        setCompletedTasks(remainingTasks);
        toast.success('Delete Successfully');
      }
    })
  }
  
  return (
    <div>
      <h3 className='text-center mt-8'><Link to='/mytasks'>See Not Completed Task</Link></h3>
      <div className='w-3/5 mx-auto mt-10'>
       {
        completedTasks.map(task => <div className='flex justify-between mb-2' key={task._id}>
          <h2 className='text-xl'>{task.title}</h2>
          <div>
          <button onClick={() => handleDelete(task._id)} className='mr-2 text-xl'><FaRegTrashAlt/></button>
          </div>
        </div>)
       }
     </div>
    </div>
  );
};

export default CompletedTasks;