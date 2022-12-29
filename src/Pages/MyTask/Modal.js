import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ open, onClose, updateTask }) => {
    const { name, details } = updateTask;
    const [task, setTask] = useState(updateTask);
    const navigate = useNavigate();
    // console.log(name, details);
    if (!open) {
        return null;
    }
    const handleModalForm = (event) => {
        event.preventDefault();
        fetch(`https://task-management-web-server.vercel.app/tasks/${updateTask._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('task updated');

                    navigate('/main/myTask');
                }
            })
    }

    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newTask = { ...task }
        newTask[field] = value;
        setTask(newTask);
    }
    return (
        <div className='w-full md:w-1/2 lg:w-1/4 items-center mx-auto border rounded-lg shadow-lg fixed top-[25%] md:top-[50%] md:left-[10%] flex bg-gray-600 md:translate-x-96 md:-translate-y-1/2'>
            <div className='p-4 text-left w-full'>
                <p onClick={onClose} className='text-right hover:cursor-pointer hover:text-red-700 font-bold pb-2'> X </p>
                <form onSubmit={handleModalForm}>
                    <div class="mb-6">

                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="name"
                            placeholder="Enter task"
                            defaultValue={name}
                            required
                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>


                    <div class="mb-6">

                        <textarea
                            onChange={handleInputChange}
                            rows="3"
                            name="details"
                            placeholder="Details"
                            defaultValue={details}

                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            required
                        ></textarea>
                    </div>
                    <div class="mb-6">
                        <button
                            type="submit"
                            class="w-full px-2 py-2 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;