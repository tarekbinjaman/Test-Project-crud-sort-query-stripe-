import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header';
import Inp from './Inp';

const Layout = () => {
    return (
        <div>
            <Header></Header>
            <Inp></Inp>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;