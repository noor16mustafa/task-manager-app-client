import React from 'react';
import { toast } from 'react-hot-toast';

const AddTask = () => {

    const imgbb = "b992d0b71484310fa94999f438e4925d";
    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const details = form.details.value;

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbb}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imagedata => {
                if (imagedata.success) {

                    console.log(imagedata.data.url)
                    const task = {
                        name, details,
                        image: imagedata.data.url
                    }
                    //save task information to database
                    fetch('http://localhost:5000/taskCollection', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',

                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(result => {

                            toast.success("task added successfully")
                            form.reset();


                        })
                }
            }
            )
            .catch(err => console.error(err))
    }
    return (
        <div className="w-full h-screen text-center py-48">

            <div className='relative w-[400px] overflow-hidden mx-auto'>
                <input type="checkbox"
                    className='peer absolute top-0 inset-x-0 w-full h-12
                opacity-0 z-10 cursor-pointer'/>
                <div className='bg-gray-500 h-12 w-full pl-5 flex items-center'>
                    <h1 className="text-lg font-semibold text-black">
                        Add a task
                    </h1>
                </div>
                <div className='absolute top-3 right-3 text-white
                transition-transform duration-500
                rotate-0 peer-checked:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>

                </div>
                <div className='absolute hidden top-3 right-3 text-white
                transition-transform duration-500
                rotate-0 peer-checked:flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>

                </div>
                <div className="bg-gray-400 overflow-hidden transition-all duration-500
                max-h-0 peer-checked:max-h-screen mb-14">
                    <div className='p-4 text-left'>

                        <form onSubmit={handleForm}>
                            <div class="mb-6">
                                <label for="name" class="block mb-2 text-sm text-gray-600"
                                >Task Name</label
                                >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter task"
                                    required
                                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm text-gray-600"
                                >Choose file</label
                                >
                                <input
                                    type="file"
                                    name='image'
                                    accept='image/*'
                                    required
                                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                />
                            </div>

                            <div class="mb-6">
                                <label for="message" class="block mb-2 text-sm text-gray-600"
                                >Task Details</label>

                                <textarea
                                    rows="3"
                                    name="details"
                                    placeholder="Details"
                                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                    required
                                ></textarea>
                            </div>
                            <div class="mb-6">
                                <button
                                    type="submit"
                                    class="w-full px-2 py-2 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );

};

export default AddTask;