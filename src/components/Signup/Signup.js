import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {createUser, googleSignIn, updateUser, logOut } = useContext(AuthContext);
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();


  const handleSignup = data => {
    setSignupError('');
    createUser(data.email, data.password)
    .then(result => {
      const profile = {displayName: data.name}
      updateUser(profile)
      .then(() => {
        logOut();
        navigate('/login');
      })
      .catch(err => console.log(err));
    })
    .catch(error => {
      setSignupError(error.message);
    });
  }
  
  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      navigate('/'); 
    })
    .catch(err => {
      setSignupError(err.message);
    });
  }
  return (
   <div className=' flex justify-center items-center'>
     <div className='w-5/6 md:w-3/5 lg:w-2/5 my-10 md:my-16  mx-auto p-6 md:p-10 bg-white'>
      <div className='text-center text-sm '>
        <h2 className='text-3xl font-bold'>Sign Up</h2>
        <p className=' mt-3 text-gray-500 '>Enter SignUp details to get access</p>
        <p className='text-gray-500'>Already have an account? <Link className='text-[#fd8f5f]' to='/login'>SignIn.</Link></p>
      </div>
     <form onSubmit={handleSubmit(handleSignup)} className='mt-4'>          
          <label className='label'>Full Name</label>
          <input className='border p-3 w-full'
           {...register("name", {required: "Full name is required."})}
           placeholder='Enter Full Name'/>
           {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

          <label className='label'>Email Address</label>
          <input className='border p-3 w-full' 
          {...register("email", {required: "Email Address is required."})}
           placeholder='Enter Email Address'/>
          {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}


          <label className='label'>Password</label>
          <input type='password' className='border p-3 w-full' {...register("password", {required: "Password is required.",
         minLength: { value: 6, message: 'Password must be 6 characters or longer' }})} placeholder='Enter Password'/>
          {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
          <p className='text-red-600 my-2'>{signupError}</p>
          <div className='flex justify-between items-center flex-col-reverse md:flex-row'>
            
          <input className='border px-8 w-full py-2 mt-5 bg-[#fd8f5f] text-white' type="submit" value='Sign Up' />
          </div>
          <div className="text-center my-3">OR</div>
          <button onClick={handleGoogleSignIn} className='border text-[#fd8f5f] px-8 py-2 w-full hover:bg-[#fd8f5f] hover:text-white border-[#fd8f5f]'><Link>Continue With Google</Link></button>
    </form>
    </div>
   </div>
  );
};

export default SignUp;