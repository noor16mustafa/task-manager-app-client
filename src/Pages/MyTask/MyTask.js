import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

import Modal from './Modal';

const MyTask = () => {
    const myTasks = useLoaderData();
    const [openModal, setOpenModal] = useState(false);
    const [updateTask, setUpdateTask] = useState(null);
    const navigate = useNavigate();
    const handleModal = id => {
        setUpdateTask(null)
        fetch(`https://task-management-web-server.vercel.app/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                setUpdateTask(data);
                setOpenModal(true);
            })
    }

    const handleCompleteBtn = (task) => {
        fetch(`https://task-management-web-server.vercel.app/completeTask/${task._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('task completed');

                    navigate('/main/completeTask');
                }
            })
    }

    //delete task
    const handleDeleteTask = task => {
        fetch(`https://task-management-web-server.vercel.app/task/${task._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('Are you sure you want to delete?');
                    navigate('/main/myTask')
                }
            })
    }

    return (
        <div className="w-full h-screen text-center py-32">
            <h2 className="text-4xl font-bold text-gray-500">My Task </h2>
            <div className='flex flex-col my-10 mx-auto items-center'>
                {
                    myTasks.map(task =>
                        <div key={task._id} className='flex flex-row w-full md:w-1/2 bg-gray-300 border-solid border-2 rounded-lg shadow-lg p-2 my-2'>
                            <img className='w-[100px] h-full' src={task.image} alt="" />
                            <div className='w-full ml-4'>
                                <div className='pl-2 my-2 flex flex-row place-content-between'>
                                    <h1 className="text-lg font-bold text-left">{task.name}</h1>
                                    <div>
                                        <button onClick={() => handleDeleteTask(task)} className='text-red-700'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleModal(task._id)} className='mx-2 hover:text-blue-900'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>

                                        </button>

                                    </div>
                                </div>
                                <div className="pl-2 my-2">
                                    <h1 className="text-sm text-left font-bold text-blue-800">Details:</h1>
                                    <p className='text-left'>{task.details}</p>
                                </div>
                                <div className="text-left pl-2 my-2">
                                    {
                                        !task.complete &&
                                        <button
                                            onClick={() => handleCompleteBtn(task)} className='bg-blue-500 px-2 py-2 rounded-lg hover:bg-slate-600'>Complete task</button>
                                    }
                                    {
                                        task.complete &&
                                        <span className='text-yellow-600 bg-yellow-300 p-2 font-bold'>Completed</span>
                                    }

                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
            {
                updateTask ?

                    <Modal updateTask={updateTask} open={openModal} onClose={() => setOpenModal(false)}></Modal>
                    :
                    ''

            }

        </div>
    );
};

export default MyTask;