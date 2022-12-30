import React from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import  image from '../../assets/addTask.png';
import { AuthContext } from '../../contexts/UserContext';

const Home = () => {
  const addedTask = useRef();
  const {user} = useContext(AuthContext);


  const handleAddTask = e => {
    if(e.key === "Enter"){
    const newTask = {
      title: addedTask.current.value,
      details: "",
      userEmail: user?.email
    }
    fetch('https://my-tasks-server-bice.vercel.app/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    }).then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        addedTask.current.value = "";
        toast.success("Task Added Successfully");
      }
    })
    }
  }
  return (
    <div className='flex flex-col justify-center items-center mt-6 md:mt-10'>
      <img className='w-[250px] md:w-fit' src={image} alt="addTaskImage" />
      <label htmlFor='task' className='text-2xl'>Add New Task</label>
      <input id='task' onKeyDown={handleAddTask} type="text" ref={addedTask} className='w-[300px] p-3' />
    </div>
  );
};

export default Home;