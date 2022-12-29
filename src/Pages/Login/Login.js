import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);
const Login = () => {
    const provider = new GoogleAuthProvider();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate('/main')
            })
            .catch(e => console.error(e))
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                toast.success('Successfully logged in')
                navigate('/main');

            })
            .catch(e => {
                console.log(e);
                setError(e.message)
            })


    }
    return (
        <div class="container mx-auto">
            <div class="max-w-xl p-5 mx-auto my-10 bg-gray-300 border rounded-md shadow-sm">
                <div class="text-center">
                    <h1 class="my-3 text-3xl font-semibold text-gray-700">Login Now!! </h1>

                </div>
                <div>
                    <form onSubmit={handleLogin}>

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
                        <div className='mb-6'>
                            <label className="label">
                                <span className="label-text-alt text-red-600 font-bold">{error}</span>

                            </label>
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none hover:bg-indigo-400"
                            >
                                Login
                            </button>
                        </div>

                    </form>
                    <div className="mb-6">
                        <button
                            onClick={handleGoogleSignIn}
                            type="submit"
                            className="w-full px-2 py-4 text-white bg-yellow-500 rounded-md  focus:bg-indigo-600 focus:outline-none hover:bg-yellow-400"
                        >
                            Google Sign In
                        </button>
                    </div>
                    <p>New to this side? Please <Link to='/register'><span className='text-info font-semibold text-blue-600'>Sign Up</span></Link> First</p>
                </div>
            </div>
        </div>
    );
};

export default Login;