import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import userImage from '../../assets/User-Profile-PNG.png';
import './Navbar.css';

const Navbar = () => {
  const {user} = useContext(AuthContext);
  return (
    <div>
      <nav className='flex flex-col-reverse lg:flex-row justify-center items-center py-3 border-b'>
        <ul className="flex text-xl mt-2 lg:mt-0 overflow-auto whitespace-nowrap">
          <li className='px-5'><NavLink className='pb-2' to='/addtasks'>Add Task</NavLink></li>
          <li className='px-5'><NavLink className='pb-2' to='/mytasks'>My Tasks</NavLink></li>
          <li className='px-5'><NavLink className='pb-2' to='/completedtasks'>Completed Tasks</NavLink></li>
          
        </ul>
        <div className='flex flex-col lg:flex-row-reverse justify-center items-center text-xl lg:absolute md:right-10'>
          <img className='w-[45px] rounded-full border border-blue-400' src={user?.photoURL || userImage} alt="" />
          <p className='px-5'>{user?.displayName}</p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;