import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import Registraion from './Auth/Registraion';
import Login from './Auth/Login';
import Form from './Form/Form';
import Payment from './pages/Payment';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <h2>Route not found</h2>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: 'registration',
                element: <Registraion></Registraion>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'form',
                element: <Form></Form>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            }
        ]
    }
])

export default router;