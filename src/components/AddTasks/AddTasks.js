import React from 'react';
import { useForm } from 'react-hook-form';
import { FaAlignLeft, FaFileImport, FaRegEdit } from "react-icons/fa";

const AddTasks = () => {
  const { register, handleSubmit } = useForm();

  const handleAddTask = data => {
    const image = data.image[0];
    const imageHostKey = process.env.REACT_APP_imageKey;
    const formData = new FormData();
    formData.append('image', image);
    
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      console.log(imgData);
    })
  }
  return (
    <div>
       <div className='w-3/5 mx-auto mt-10'>
        <form onSubmit={handleSubmit(handleAddTask)}>
          <div className='flex items-center'>
            <FaRegEdit className='text-gray-800'/>
            <input {...register("title")} 
            className='block focus:outline-none w-full pl-5 p-2 placeholder:text-black' type="text" placeholder='Add Title' />
          </div>
          <div className='flex items-center'>
            <FaAlignLeft className='text-gray-800'/>
            <input {...register("details")}
            className='block focus:outline-none w-full pl-5 p-2 placeholder:text-black' type="text" placeholder='Add Details' />
          </div>
          <div className='flex items-center'>
            <FaFileImport className='text-gray-800'/>
            <input {...register("image")} 
            className='block focus:outline-none w-full pl-5 p-2 placeholder:text-black' type="file"/>
          </div>
          <input className='bg-blue-500 px-2 py-0 text-white w-fit block mx-auto' type="submit" value="Add Task" />
        </form>

       </div>
    </div>
  );
};

export default AddTasks;