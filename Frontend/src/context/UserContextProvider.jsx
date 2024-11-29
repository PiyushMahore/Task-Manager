import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState()

    const signUp = async (firstName, lastName, userName, email, password) => {
        try {
            const payload = {
                firstName,
                lastName,
                userName,
                email,
                password,
            };

            const response = await axios.post('http://localhost:8000/api/user/signup', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return response.data;

        } catch (error) {
            console.log("Failed to sign up", error)
        }
    }

    const login = async (email, password) => {
        try {
            const result = await axios.post('http://localhost:8000/api/user/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });
            return result.data
        } catch (error) {
            console.log("Failed to login", error)
        }
    }

    const getCurrentUser = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/user/get-current-user', {
                withCredentials: true
            })
            setUser(user)
            return result.data
        } catch (error) {
            console.log("Failed to get current User", error)
        }
    }

    const logOut = async () => {
        try {
            const result = await axios.post('http://localhost:8000/api/user/logout', {}, {
                withCredentials: true
            })
            return result.data
        } catch (error) {
            console.log("Failed to logout", error)
        }
    }

    const updateUser = async (firstName, lastName, userName, password) => {
        try {
            const result = await axios.patch('http://localhost:8000/api/user/update-user', {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: password
            })
            return result.data
        } catch (error) {
            console.log("Failed to update user", error)
        }
    }

    return (
        <UserContext.Provider value={{ signUp, login, getCurrentUser, logOut, updateUser, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserAuth = () => useContext(UserContext)

export { useUserAuth, UserContextProvider }
