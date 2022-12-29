import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { toast } from 'react-hot-toast';

const auth = getAuth(app);
const Register = () => {
    const navigate = useNavigate();

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const password = form.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();

                toast.success('User created Successfully')
                navigate('/')

            })
            .catch(error => {
                console.error(error);

            })

    }
    return (
        <div class="container mx-auto">
            <div class="max-w-xl p-5 mx-auto my-10 bg-gray-300 border rounded-md shadow-sm">
                <div class="text-center">
                    <h1 class="my-3 text-3xl font-semibold text-gray-700">Sign Up </h1>

                </div>
                <div>
                    <form onSubmit={handleSignUp}>
                        <div className="mb-6">
                            <label for="name" className="block mb-2 text-sm text-gray-600 text-left"
                            >Full Name</label
                            >
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                required
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                        </div>
                        <div class="mb-6">
                            <label for="email" className="block mb-2 text-sm text-gray-600 text-left"
                            >Email Address</label
                            >
                            <input
                                type="email"
                                name="email"
                                placeholder="you@email.com"
                                required
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                        </div>
                        <div class="mb-6">
                            <label for="phone" className="block mb-2 text-sm text-gray-600 text-left">Phone Number</label>
                            <input
                                type="number"
                                name="phone"
                                placeholder="91 1234-567"
                                required
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                        </div>
                        <div class="mb-6">
                            <label for="email" className="block mb-2 text-sm text-gray-600 text-left"
                            >Password</label
                            >
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                required
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none hover:bg-indigo-400"
                            >
                                Sign Up
                            </button>
                        </div>
                        <p>Already have an account? Please <Link to='/'><span className='text-info font-semibold'>Login</span></Link></p>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;