import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';

const Home = () => {
    const allTask = useLoaderData();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const handleClick = () => {
        navigate('/main/addTask');
    }
    const handleDetailsBtn = () => {
        navigate('/main/addTask');
    }

    if (loader) {
        <Loader></Loader>
    }
    else {
        setLoader(false);
    }

    return (
        <div className="w-full h-screen text-center py-48 ">
            <div>
                <h2 className="text-xl font-bold text-gray-500">Add Task</h2>
                <button onClick={handleClick} className='px-16 bg-gray-300 hover:bg-gray-600 border border-solid font-bold text-2xl'> + </button>
            </div>
            <div className='py-20'>
                <div className='mx-10 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 '>
                    {
                        allTask.map(task =>

                            <div key={task._id} className='p-5 text-left rounded-lg bg-slate-300 '>
                                <h2 className="text-2xl font-bold text-blue-600"><span className='text-black'>Task:</span> {task.name}</h2>
                                <div className='p-3'>
                                    <button
                                        onClick={handleDetailsBtn} className='bg-slate-400 rounded-lg hover:bg-slate-500 px-2 py-1'>Details</button>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    );
};

export default Home;