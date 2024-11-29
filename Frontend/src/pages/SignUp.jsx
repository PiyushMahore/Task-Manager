import React, { useState } from "react";
import { useNavigate, NavLink, Navigate } from 'react-router';
import { useUserAuth } from "../context/UserContextProvider";

function SignUp() {
    const useAuth = useUserAuth()
    const navigate = useNavigate()

    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signUp = async () => {
        const data = await useAuth.signUp(firstName, lastName, userName, email, password);
        if (data?.data._id) {
            useAuth.setUser(data)
            navigate('/')
        } else {
            window.alert("All Fields Are Required")
        }
    };

    if (useAuth.user) return <Navigate to={`/`} />

    return (
        <div className='max-h-screen'>
            <div className="flex sm:h-screen flex-1 flex-col justify-center items-center px-6 sm:py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 mx-auto w-full max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={firstName}
                                    onChange={(e) => setfirstName(e.target.value)}
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={lastName}
                                    onChange={(e) => setlastName(e.target.value)}
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-200"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                                User Name
                            </label>
                            <div className="mt-2">
                                <input
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-200"
                                />
                            </div>
                        </div>

                        <div className="pb-3">
                            <button
                                onClick={signUp}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                            <p className="mt-3 text-lg text-center">Already a user! <NavLink to={'/login'} className="text-indigo-600">sign in</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
