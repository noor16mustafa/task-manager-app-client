import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyTask from "../Pages/MyTask/MyTask";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([

    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/',
        element: <Login></Login>,
    },

    {
        path: '/main',
        element: <Main></Main>,
        children: [
            {
                path: '/main',
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/tasks')
            },
            {
                path: '/main/addTask',
                element: <AddTask></AddTask>
            },
            {
                path: '/main/myTask',
                element: <MyTask></MyTask>,
                loader: () => fetch('http://localhost:5000/tasks')
            },
            {
                path: '/main/completeTask',
                element: <CompleteTask></CompleteTask>,
                loader: () => fetch('http://localhost:5000/completeTask')

            },
        ]
    }

])