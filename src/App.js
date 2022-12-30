import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddTasks from "./components/AddTasks/AddTasks";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyTasks from "./components/MyTasks/MyTasks";
import Signup from "./components/Signup/Signup";
import Main from "./layout/Main";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoute><Main></Main></PrivateRoute>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/mytasks',
          element: <MyTasks></MyTasks>
        },
        {
          path: '/addtasks',
          element: <AddTasks></AddTasks>
        },
        {
          path: '/completedtasks',
          element: <CompletedTasks></CompletedTasks>
        }
      ]
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/signup',
      element: <Signup></Signup>
    }
  ])
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
