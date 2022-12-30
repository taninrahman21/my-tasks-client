import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaCheck, FaRegSquare, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const MyTasks = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [tasksLoading, setTaskLoading] = useState(true);
  const [updateTask, setUpdateTask] = useState(null);
  const {user} = useContext(AuthContext);
  useEffect( () => {
    fetch(`http://localhost:5000/mytasks?email=${user?.email}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setTaskLoading(false);
      setMyTasks(data);
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
        const remainingTasks = myTasks.filter(task => task._id !== id);
        setMyTasks(remainingTasks);
        toast.success('Delete Successfully');
      }
    })
  }

  const handleComplete = id => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.modifiedCount > 0){
        toast.success("Task Completed");
      }
    })
  }

  const handleEdit = task => {
    setUpdateTask(task);
  }

  return (
    <div>
     <div className='w-3/5 mx-auto mt-10'>
       {
        myTasks.map(task => <div className='flex justify-between items-center mb-2' key={task._id}>
          <div className='flex text-xl items-center'>
            {task?.isCompleted ? <FaCheck className='text-blue-500'/> : <FaRegSquare onClick={() => handleComplete(task._id)}/>}
            <h2 className='ml-3'><Link to={`/tasks/${task._id}`}>{task.title}</Link></h2>
          </div>
          <div className=''>
          <button onClick={() => handleDelete(task._id)} className='mr-2 text-xl'><FaRegTrashAlt/></button>
          </div>
        </div>)
       }
     </div>
    </div>
  );
};

export default MyTasks;