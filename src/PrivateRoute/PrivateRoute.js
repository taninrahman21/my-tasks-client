import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);

  if(loading){
    return <p className='text-center'>Loading....</p>
  }
  if(user?.uid){
    return children;
  }
  return <Navigate to='/login' replace></Navigate>;
};

export default PrivateRoute;