import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();


  const handleLogin = data => {
    setLoginError('');
    signInUser(data.email, data.password)
    .then(result => {
      navigate('/');
    })
    .catch(err => {
      setLoginError(err.message);
    })
  }
  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      navigate('/');
    })
    .catch(err => console.log(err));
  }
  return (
   <div className=' flex justify-center items-center'>
     <div className='w-5/6 md:w-3/5 lg:w-2/5 my-10 md:my-16 mx-auto p-6 md:p-10 bg-white'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold'>Sign In</h2>
        <p className='text-sm text-gray-500 mt-3'>You must have to login for add your daily tasks.</p>
        <p className='text-sm text-gray-500'>Don't have an account? <Link className='text-[#fd8f5f]' to='/signup'>Create an account.</Link></p>
      </div>
      
     <form onSubmit={handleSubmit(handleLogin)} className='mt-4'>          
          <label className='label'>Email Address</label>
          <input className='border p-3 mb-3 w-full' {...register("email",
          {required: "Email Address is required."}
          )} placeholder='Email Address'/>
          {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

          <label className='label'>Password</label>
          <input type='password' className='border p-3 w-full' {...register("password",
          {required: "Password is required."}
          )} placeholder='Password'/>
          {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

          <label className="label text-[#fd8f5f]">Forgot Password?</label>
          <p className='my-2 text-red-600'>{loginError}</p>
          <div className='flex justify-between items-center flex-col-reverse md:flex-row'>
            
            <input className='border px-8 py-2 mt-5 bg-[#fd8f5f] text-white w-full md:w-fit' type="submit" value='Login' />
          </div>
          <div className="text-center my-3">OR</div>
          <button onClick={handleGoogleSignIn} className='border px-8 text-[#fd8f5f] py-2 w-full hover:bg-[#fd8f5f] hover:text-white border-[#fd8f5f]'><Link>Continue With Google</Link></button>
    </form>
    </div>
   </div>
  );
};

export default Login;