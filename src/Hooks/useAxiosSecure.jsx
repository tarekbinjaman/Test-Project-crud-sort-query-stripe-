import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from '../Auth/useAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true
});

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                console.log('Error caught in interceptor:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    console.log('Unauthorized - logging out user');
                    logOut()
                        .then(() => {
                            // console.log('User logged out');
                            navigate('/login');
                        })
                        .catch((err) => console.log('Logout error:', err));
                }
                return Promise.reject(error);
            }
        );
    }, [])
    return axiosInstance;
};

export default useAxiosSecure;