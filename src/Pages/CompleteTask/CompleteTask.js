import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const CompleteTask = () => {
    const taskComplete = useLoaderData();
    const navigate = useNavigate();
    //delete task
    const handleDeleteTask = task => {
        fetch(`http://localhost:5000/task/${task._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('Are you sure you want to delete?');
                    navigate('/main/completeTask')
                }
            })
    }
    return (
        <div className="w-full h-screen text-center py-32">
            <h2 className="text-4xl font-bold">Completed Task </h2>
            <div className='flex flex-col my-10 mx-auto items-center'>
                {
                    taskComplete.map(task =>
                        <div key={task._id} className='flex flex-row w-full md:w-1/2 bg-gray-300 border-solid border-2 rounded-lg shadow-lg p-2 my-2'>
                            <img className='w-[100px] h-full' src={task.image} alt="" />
                            <div className='w-full ml-4'>
                                <div className='pl-2 my-2 flex flex-row place-content-between'>
                                    <h1 className="text-lg font-bold text-left">{task.name}</h1>
                                    <div>
                                        <button
                                            onClick={() => handleDeleteTask(task)} className='text-red-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>


                                    </div>
                                </div>
                                <div className="pl-2 my-2">
                                    <h1 className="text-sm text-left font-bold text-blue-800">Details:</h1>
                                    <p className='text-left'>{task.details}</p>
                                </div>
                                <div className="text-left pl-2 my-2 flex flex-row ">
                                    <span className='text-yellow-600 bg-yellow-300 p-2 font-bold'>Completed</span>
                                    <button className="text-blue-600 ml-4 text-xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </button>



                                </div>
                            </div>
                        </div>
                    )
                }

            </div>


        </div>
    );
};

export default CompleteTask;