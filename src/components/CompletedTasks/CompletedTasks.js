import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const CompletedTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const {user} = useContext(AuthContext);
  useEffect( () => {
    fetch(`https://my-tasks-server-bice.vercel.app/mytasks?email=${user?.email}`)
    .then(res => res.json())
    .then(data => {
      setAllTasks(data);
    })
  }, [user?.email])

  const handleDelete = id => {
    fetch(`https://my-tasks-server-bice.vercel.app/tasks/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        const remainingTasks = completedTasks.filter(task => task._id !== id);
        setAllTasks(remainingTasks);
        toast.success('Delete Successfully');
      }
    })
  }
  const completedTasks = allTasks.filter(task => task?.isCompleted === true);
  return (
    <div>
      <h3 className='text-center mt-8'><Link to='/mytasks'>See Not Completed Task</Link></h3>
      <div className='w-3/5 mx-auto mt-10'>
       {
        completedTasks.map(task => <div className='flex justify-between mb-2' key={task._id}>
          <h2 className='text-xl'>{task.title}</h2>
          <div className='text-white'>
          <button className='p-1 bg-green-500 mr-2'>Edit Task</button>
          <button onClick={() => handleDelete(task._id)} className='p-1 bg-red-500 mr-2'>Delete</button>
          </div>
        </div>)
       }
     </div>
    </div>
  );
};

export default CompletedTasks;